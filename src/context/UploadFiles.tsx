import { createContext, useContext, useState, ReactNode } from "react";
import { UploadFile } from "../interfaces";
import { UploadAPI } from "../api/upload";
import { v4 as uuidv4 } from "uuid";

interface UploadFilesContextType {
  uploads: UploadFile[];
  addFiles: (files: File[]) => void;
  startUpload: (file: File) => void;
  pauseUpload: (file: File) => void;
  resumeUpload: (file: File) => void;
  retryUpload: (file: File) => void;
  removeUpload: (file: File) => void;
}

const UploadFilesContext = createContext<UploadFilesContextType>({} as UploadFilesContextType);

export const UploadFilesProvider = ({ children }: { children: ReactNode }) => {
  const [uploads, setUploads] = useState<UploadFile[]>([]);
  const { uploadChunk, mergeChunks, cancelUpload } = UploadAPI();
  const chunkSize = 150 * 1024; // 150KB

  const addFiles = (files: File[]) => {
    const newUploads: UploadFile[] = files.map((file) => ({
      file,
      progress: 0,
      status: "waiting",
      fileId: uuidv4(),
      currentChunk: 0,
      totalChunks: Math.ceil(file.size / chunkSize),
    }));
    setUploads((prev) => [...prev, ...newUploads]);
  };

  const startUpload = (file: File) => {
    setUploads((prev) =>
      prev.map((u) => u.file === file ? { ...u, status: "uploading" } : u)
    );
    sendNextChunk(file);
  };

  const sendNextChunk = (file: File) => {
    const upload = uploads.find((u) => u.file === file);
    if (!upload || upload.status !== "uploading") return;

    const { fileId, currentChunk, totalChunks } = upload;

    if (currentChunk >= totalChunks) {
      mergeChunks(fileId!, file.name).then(() => {
        setUploads((prev) =>
          prev.map((u) => u.file === file ? { ...u, status: "done", progress: 100 } : u)
        );
      });
      return;
    }

    uploadChunk(
      file,
      currentChunk,
      chunkSize,
      fileId!,
      totalChunks,
      (percent) => {
        setUploads((prev) =>
          prev.map((u) =>
            u.file === file ? { ...u, progress: Math.min(100, ((currentChunk + percent / 100) / totalChunks) * 100) } : u
          )
        );
      },
      () => {
        setUploads((prev) =>
          prev.map((u) =>
            u.file === file ? { ...u, currentChunk: currentChunk + 1 } : u
          )
        );
        sendNextChunk(file);
      },
      (error) => {
        console.error("Upload chunk error:", error);
        setUploads((prev) =>
          prev.map((u) => u.file === file ? { ...u, status: "error" } : u)
        );
      }
    );
  };

  const pauseUpload = (file: File) => {
    setUploads((prev) =>
      prev.map((u) => u.file === file ? { ...u, status: "paused" } : u)
    );
  };

  const resumeUpload = (file: File) => {
    startUpload(file);
  };

  const retryUpload = (file: File) => {
    setUploads((prev) =>
      prev.map((u) =>
        u.file === file ? { ...u, status: "uploading" } : u
      )
    );
    sendNextChunk(file);
  };

  const removeUpload = (file: File) => {
    const upload = uploads.find((u) => u.file === file);
    if (upload?.fileId) cancelUpload(upload.fileId);
    setUploads((prev) => prev.filter((u) => u.file !== file));
  };

  return (
    <UploadFilesContext.Provider
      value={{
        uploads,
        addFiles,
        startUpload,
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
