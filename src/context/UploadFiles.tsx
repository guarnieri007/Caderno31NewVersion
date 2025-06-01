// src/context/UploadFiles.tsx
import { createContext, useContext, useState, useRef, ReactNode } from "react";
import { UploadFile } from "../interfaces";
import { UploadAPI } from "../api/upload";
import { v4 as uuidv4 } from "uuid";
import { getAccessToken } from "./AuthTokenSingleton";

interface UploadFilesContextType {
  uploads: UploadFile[];
  addFiles: (files: File[]) => void;
  pauseUpload: (file: File) => void;
  resumeUpload: (file: File) => void;
  retryUpload: (file: File) => void;
  removeUpload: (file: File) => void;
}

const UploadFilesContext = createContext<UploadFilesContextType>({} as UploadFilesContextType);

export const UploadFilesProvider = ({ children }: { children: ReactNode }) => {
  const [uploads, setUploads] = useState<UploadFile[]>([]);
  const { uploadChunk, mergeChunks, cancelUpload } = UploadAPI();
  const chunkSize = 40 * 1024; // 40KB
  const activeRequests = useRef<Map<string, XMLHttpRequest[]>>(new Map());

  const addFiles = (files: File[]) => {
    const newUploads: UploadFile[] = files.map((file) => ({
      file,
      progress: 0,
      status: "paused",
      fileId: uuidv4(),
      currentChunk: 0,
      totalChunks: Math.ceil(file.size / chunkSize),
    }));

    setUploads((prev) => [...prev, ...newUploads]);
    newUploads.forEach((upload) => startUpload(upload));
  };

  const startUpload = async (upload: UploadFile) => {
    const { file, fileId, totalChunks } = upload;
    let currentChunk = upload.currentChunk;
    const token = getAccessToken();

    setUploads((prev) =>
      prev.map((u) =>
        u.file.name === file.name && u.file.size === file.size
          ? { ...u, status: "uploading" }
          : u
      )
    );

    while (currentChunk < totalChunks) {
      const chunkIndex = currentChunk;

      await new Promise<void>((resolve, reject) => {
        const xhr = uploadChunk(
          file,
          chunkIndex,
          chunkSize,
          fileId!,
          totalChunks,
          (percent) => {
            const calculated = ((chunkIndex + percent / 100) / totalChunks) * 100;
            setUploads((prev) =>
              prev.map((u) =>
                u.file.name === file.name && u.file.size === file.size
                  ? { ...u, progress: Math.min(100, calculated) }
                  : u
              )
            );
          },
          () => {
            currentChunk++;
            setUploads((prev) =>
              prev.map((u) =>
                u.file.name === file.name && u.file.size === file.size
                  ? { ...u, currentChunk } : u
              )
            );
            resolve();
          },
          (error) => {
            console.error("Upload chunk error:", error);
            setUploads((prev) =>
              prev.map((u) =>
                u.file.name === file.name && u.file.size === file.size
                  ? { ...u, status: "error" }
                  : u
              )
            );
            reject();
          },
          token
        );

        if (!activeRequests.current.has(fileId)) {
          activeRequests.current.set(fileId, []);
        }
        activeRequests.current.get(fileId)!.push(xhr);

        setUploads((prev) =>
          prev.map((u) =>
            u.file.name === file.name && u.file.size === file.size
              ? { ...u, xhr } : u
          )
        );
      });
    }

    await mergeChunks(fileId!, file.name);
    activeRequests.current.delete(fileId);
    setUploads((prev) =>
      prev.map((u) =>
        u.file.name === file.name && u.file.size === file.size
          ? { ...u, status: "done", progress: 100 }
          : u
      )
    );
  };

  const pauseUpload = (file: File) => {
    setUploads((prev) =>
      prev.map((u) =>
        u.file.name === file.name && u.file.size === file.size
          ? { ...u, status: "paused" }
          : u
      )
    );
  };

  const resumeUpload = (file: File) => {
    const upload = uploads.find(
      (u) => u.file.name === file.name && u.file.size === file.size
    );
    if (upload) startUpload(upload);
  };

  const retryUpload = (file: File) => {
    const upload = uploads.find(
      (u) => u.file.name === file.name && u.file.size === file.size
    );
    if (upload) startUpload(upload);
  };

  const removeUpload = (file: File) => {
    const upload = uploads.find(
      (u) => u.file.name === file.name && u.file.size === file.size
    );
    if (!upload) return;

    // Abort all active XHRs for this file
    const requests = activeRequests.current.get(upload.fileId!);
    if (requests) {
      requests.forEach((xhr) => xhr.abort());
      activeRequests.current.delete(upload.fileId!);
    }

    cancelUpload(upload.fileId!, upload.file.name);

    setUploads((prev) =>
      prev.filter(
        (u) => u.file.name !== file.name || u.file.size !== file.size
      )
    );
  };

  return (
    <UploadFilesContext.Provider
      value={{
        uploads,
        addFiles,
        pauseUpload,
        resumeUpload,
        retryUpload,
        removeUpload,
      }}
    >
      {children}
    </UploadFilesContext.Provider>
  );
};

export function useUploadFiles() {
  return useContext(UploadFilesContext);
}
