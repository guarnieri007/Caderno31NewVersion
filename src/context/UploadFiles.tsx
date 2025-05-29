// src/context/UploadFiles.tsx

import { createContext, useContext, useState, ReactNode } from "react";
import { UploadAPI } from "../api/upload";
import { UploadFile, UploadFileProps } from "../interfaces";

interface UploadFilesContextType {
  uploads: UploadFile[];
  addFiles: (files: File[]) => void;
  startUpload: (file: File, path: string) => void;
  pauseUpload: (file: File) => void;
  resumeUpload: (file: File, path: string) => void;
  retryUpload: (file: File, path: string) => void;
  removeUpload: (file: File) => void;
}

const UploadFilesContext = createContext<UploadFilesContextType>({} as UploadFilesContextType);

export const UploadFilesProvider = ({ children }: { children: ReactNode }) => {
  const [uploads, setUploads] = useState<UploadFile[]>([]);
  const { uploadFile } = UploadAPI();

  const addFiles = (files: File[]) => {
    const newUploads: UploadFile[] = files.map((file) => ({
      file,
      progress: 0,
      status: "paused", // começa pausado, só envia no startUpload
    }));
    setUploads((prev) => [...prev, ...newUploads]);
  };

  const startUpload = (file: File, path: string) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append("file", file);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100);
        setUploads((prev) =>
          prev.map((u) =>
            u.file === file ? { ...u, progress: percent } : u
          )
        );
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        setUploads((prev) =>
          prev.map((u) =>
            u.file === file ? { ...u, status: "done" } : u
          )
        );
      } else {
        setUploads((prev) =>
          prev.map((u) =>
            u.file === file ? { ...u, status: "error" } : u
          )
        );
      }
    };

    xhr.onerror = () => {
      setUploads((prev) =>
        prev.map((u) =>
          u.file === file ? { ...u, status: "error" } : u
        )
      );
    };

    xhr.open("POST", `${import.meta.env.VITE_BACKEND_PROTOCOAL}://${import.meta.env.VITE_BACKEND_HOST}:${import.meta.env.VITE_BACKEND_PORT}/api/${path}`);
    xhr.send(formData);

    setUploads((prev) =>
      prev.map((u) =>
        u.file === file
          ? { ...u, status: "uploading", xhr }
          : u
      )
    );
  };

  const pauseUpload = (file: File) => {
    setUploads((prev) =>
      prev.map((u) => {
        if (u.file === file && u.status === "uploading") {
          u.xhr?.abort();
          return { ...u, status: "paused", xhr: undefined };
        }
        return u;
      })
    );
  };

  const resumeUpload = (file: File, path: string) => {
    startUpload(file, path); // reinicia como se fosse "start", já que não salvamos o progresso ainda
  };

  const retryUpload = (file: File, path: string) => {
    startUpload(file, path);
  };

  const removeUpload = (file: File) => {
    setUploads((prev) => {
      const found = prev.find((u) => u.file === file);
      found?.xhr?.abort(); // se estiver ativo, aborta
      return prev.filter((u) => u.file !== file);
    });
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
