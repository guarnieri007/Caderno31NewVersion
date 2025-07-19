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
  getCompletedUploads: () => UploadFile[];
}

const UploadFilesContext = createContext<UploadFilesContextType>({} as UploadFilesContextType);

export const UploadFilesProvider = ({ children }: { children: ReactNode }) => {
  const [uploads, setUploads] = useState<UploadFile[]>([]);
  const { uploadChunk, mergeChunks, cancelUpload } = UploadAPI();
  const chunkSize = 40 * 1024; // 40KB
  const activeRequests = useRef<Map<string, XMLHttpRequest[]>>(new Map());
  const queue = useRef<UploadFile[]>([]);
  const MAX_CONCURRENT_UPLOADS = 2;
  const isProcessing = useRef(false);

  const addFiles = (files: File[]) => {
    const newUploads: UploadFile[] = files.map((file) => ({
      file,
      progress: 0,
      status: "waiting",
      fileId: uuidv4(),
      currentChunk: 0,
      totalChunks: Math.ceil(file.size / chunkSize),
    }));

    setUploads((prev) => {
      const updated = [...prev, ...newUploads];
      queue.current.push(...newUploads);
      processUploadQueue(updated);
      return updated;
    });
  };

  const processUploadQueue = (currentUploads = uploads, forceStart: boolean = false) => {
    const uploadingCount = currentUploads.filter((u) => u.status === "uploading").length;
    const availableSlots = MAX_CONCURRENT_UPLOADS - uploadingCount;

    if (!forceStart) {
      if (isProcessing.current && (availableSlots <= 0)) return;
      isProcessing.current = true;

      if (availableSlots <= 0 || queue.current.length === 0) {
        isProcessing.current = false;
        return;
      }
    }

    const toUpload = queue.current.splice(0, availableSlots);

    toUpload.forEach((upload) => {
      setUploads((prev) =>
        prev.map((u) =>
          u.file.name === upload.file.name && u.file.size === upload.file.size
            ? { ...u, status: "uploading" as const }
            : u
        )
      );
      startUpload(upload);
    });
  };

  const getCompletedUploads = (): UploadFile[] => {
    return uploads.filter((u) => u.status === "done");
  };


  const startUpload = async (upload: UploadFile) => {
    const { file, fileId, totalChunks } = upload;
    let currentChunk = upload.currentChunk;

    while (currentChunk < totalChunks) {
      const chunkIndex = currentChunk;
      const token = getAccessToken();

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
                  ? { ...u, progress: Math.min(100, calculated), status: "uploading" as const }
                  : u
              )
            );
          },
          () => {
            currentChunk++;
            setUploads((prev) =>
              prev.map((u) =>
                u.file.name === file.name && u.file.size === file.size
                  ? { ...u, currentChunk }
                  : u
              )
            );
            resolve();
          },
          (error) => {
            console.error("Upload chunk error:", error);
            setUploads((prev) =>
              prev.map((u) =>
                u.file.name === file.name && u.file.size === file.size
                  ? { ...u, status: "error" as const }
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
            u.file.name === file.name && u.file.size === file.size ? { ...u, xhr } : u
          )
        );
      });
    }

    await mergeChunks(fileId!, file.name);
    activeRequests.current.delete(fileId);

    setUploads((prev) => {
      const updated = prev.map((u) =>
        u.file.name === file.name && u.file.size === file.size
          ? { ...u, status: "done" as const, progress: 100 }
          : u
      );
      isProcessing.current = false;
      processUploadQueue(updated, true);
      return updated;
    });
  };

  const pauseUpload = (file: File) => {
    const upload = uploads.find((u) => u.file.name === file.name && u.file.size === file.size);
    if (!upload) return;

    activeRequests.current.get(upload.fileId)?.forEach((xhr) => xhr.abort());
    activeRequests.current.delete(upload.fileId);

    console.log(queue);

    setUploads((prev) =>
      prev.map((u) =>
        u.file.name === file.name && u.file.size === file.size
          ? { ...u, status: "paused", xhr: undefined }
          : u
      )
    );
  };

  const resumeUpload = (file: File) => {
    const upload = uploads.find((u) => u.file.name === file.name && u.file.size === file.size);
    if (!upload) return;
    queue.current.push(upload);
    setUploads((prev) => {
      const updated = prev.map((u) =>
        u.file.name === file.name && u.file.size === file.size ? { ...u, status: "waiting" as const } : u
      );
      processUploadQueue(updated);
      return updated;
    });
  };

  const retryUpload = (file: File) => {
    resumeUpload(file);
  };

  const removeUpload = (file: File) => {
    const upload = uploads.find((u) => u.file.name === file.name && u.file.size === file.size);
    if (!upload) return;

    const requests = activeRequests.current.get(upload.fileId);
    if (requests) {
      requests.forEach((xhr) => xhr.abort());
      activeRequests.current.delete(upload.fileId);
    }

    cancelUpload(upload.fileId, file.name);

    setUploads((prev) => {
      const updated = prev.filter((u) => u.file.name !== file.name || u.file.size !== file.size);
      processUploadQueue(updated);
      return updated;
    });
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
        getCompletedUploads,
      }}
    >
      {children}
    </UploadFilesContext.Provider>
  );
};

export function useUploadFiles() {
  return useContext(UploadFilesContext);
}