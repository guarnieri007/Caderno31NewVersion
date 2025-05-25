// components/common/UploadArea.tsx
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";

interface UploadFile {
    file: File;
    progress: number;
    status: "uploading" | "paused" | "error" | "done";
    xhr?: XMLHttpRequest;
}

const UploadWrapper = styled.div`
  border: 2px dashed ${(prop) => prop.theme.colors.button_text};
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  border-radius: 12px;
  background-color: ${(prop) => prop.theme.colors.background_primary};
  transition: background-color 0.2s;
  &:hover {
    background-color: ${(prop) => prop.theme.colors.background_secondary};
  }
`;

const FileItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding: 0.5rem;
  background: ${(prop) => prop.theme.colors.background_primary};
  border: 1px solid #ddd;
  border-radius: 8px;
  gap: ${(prop) => prop.theme.spacings.reduced};

  .actions {
    display: flex;
    gap: ${(prop) => prop.theme.spacings.small};
    align-items: end;
    justify-content: end;
    align-self: end;
  }
`;

const ProgressBar = styled.div<{ progress: number }>`
  height: 8px;
  width: 100%;
  background: ${(prop) => prop.theme.colors.background_card};
  border-radius: 4px;
  overflow: hidden;
  margin: 0.5rem 0;
  &::after {
    content: "";
    display: block;
    height: 100%;
    width: ${({ progress }) => `${progress}%`};
    background-color: #007bff;
    transition: width 0.3s ease;
  }
`;

export const UploadArea = () => {
    const [uploads, setUploads] = useState<UploadFile[]>([]);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const newUploads = acceptedFiles.map((file) => {
            const xhr = new XMLHttpRequest();
            return {
                file,
                progress: 0,
                status: "uploading",
                xhr,
            };
        });

        newUploads.forEach((upload) => {
            const { file, xhr } = upload;
            xhr.open("POST", "http://localhost:4000/upload"); // ajustar URL depois
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
            const formData = new FormData();
            formData.append("file", file);
            xhr.send(formData);
        });

        setUploads((prev) => [...prev, ...newUploads] as UploadFile[]);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        multiple: true,
    });

    const handlePause = (file: File) => {
        setUploads((prev) =>
            prev.map((u) => {
                if (u.file === file && u.status === "uploading") {
                    u.xhr?.abort();
                    return { ...u, status: "paused" };
                }
                return u;
            })
        );
    };

    const handleResume = (file: File) => {
        const upload = uploads.find((u) => u.file === file);
        if (!upload) return;
        const newXhr = new XMLHttpRequest();
        const formData = new FormData();
        formData.append("file", file);

        newXhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
                const percent = Math.round((event.loaded / event.total) * 100);
                setUploads((prev) =>
                    prev.map((u) =>
                        u.file === file ? { ...u, progress: percent } : u
                    )
                );
            }
        };
        newXhr.onload = () => {
            setUploads((prev) =>
                prev.map((u) =>
                    u.file === file ? { ...u, status: "done" } : u
                )
            );
        };
        newXhr.onerror = () => {
            setUploads((prev) =>
                prev.map((u) =>
                    u.file === file ? { ...u, status: "error" } : u
                )
            );
        };

        newXhr.open("POST", "http://localhost:4000/upload");
        newXhr.send(formData);

        setUploads((prev) =>
            prev.map((u) =>
                u.file === file
                    ? { ...u, xhr: newXhr, status: "uploading" }
                    : u
            )
        );
    };

    const handleRetry = (file: File) => {
        handleResume(file);
    };

    const handleRemove = (file: File) => {
        setUploads((prev) => prev.filter((u) => u.file !== file));
    };

    return (
        <div>
            <UploadWrapper {...getRootProps()}>
                <input {...getInputProps()} />
                <p>📁 Drag and drop or click here to send your files</p>
            </UploadWrapper>

            <div>
                {uploads.map((upload) => {
                    const type = upload.file.type.startsWith("image")
                        ? "Image"
                        : upload.file.type.startsWith("video")
                            ? "Video"
                            : upload.file.type.startsWith("audio")
                                ? "Audio"
                                : "Unknown";

                    return (
                        <FileItem key={upload.file.name}>
                            <div style={{ flex: 1 }}>
                                <strong>{type}</strong>
                                <ProgressBar progress={upload.progress} />
                            </div>


                            <div className="actions">
                                {upload.status === "uploading" && (
                                    <button onClick={() => handlePause(upload.file)}>⏸️</button>
                                )}
                                {upload.status === "paused" && (
                                    <button onClick={() => handleResume(upload.file)}>▶️</button>
                                )}
                                {upload.status === "error" && (
                                    <button onClick={() => handleRetry(upload.file)}>🔁</button>
                                )}
                                <button onClick={() => handleRemove(upload.file)}>❌</button>
                            </div>
                        </FileItem>
                    );
                })}
            </div>
        </div>
    );
};
