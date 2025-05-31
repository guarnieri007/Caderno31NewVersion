// components/common/UploadArea.tsx
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FileItem, ProgressBar, UploadWrapper } from "../styles/common/uploadArea";
import { UploadFile } from "../../interfaces";
import Icon from "../icons/icon";
import { UIIcons } from "../icons";
import { formatFileSize } from "../../helper/file-size-convertions";

export const UploadArea = () => {
    const [uploads, setUploads] = useState<UploadFile[]>([]);

    const itemsLoadingFiles: React.CSSProperties = {
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: "12px",
        marginTop: "16px",
    }

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
        <div style={{ width: "100%", height: "auto" }}>
            <UploadWrapper {...getRootProps()}>
                <input {...getInputProps()} />
                <p>📁 Drag and drop or click here to send your files</p>
            </UploadWrapper>

            <div style={itemsLoadingFiles}>
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
                            <div className="picture">

                                {type === "Image" && (
                                    <img
                                        style={{ maxHeight: "100%", maxWidth: "100%" }}
                                        src={URL.createObjectURL(upload.file)}
                                        alt={upload.file.name}
                                    />
                                )}
                                {type === "Video" && (
                                    <video src={URL.createObjectURL(upload.file)} controls={false} style={{ maxHeight: "100%", maxWidth: "100%" }} />
                                )}
                                {type === "Audio" && (
                                    <Icon icon={UIIcons.Audio} style={{ maxHeight: "100%", maxWidth: "100%" }} size={25} />
                                )}
                                {type === "Unknown" && (
                                    <Icon icon={UIIcons.Book} style={{ maxHeight: "100%", maxWidth: "100%" }} size={25} />
                                )}

                            </div>
                            <div className="description" style={{ flex: 1 }}>
                                <strong>{type}</strong>
                                <p style={{ fontSize: "12px", padding: "0px", margin: "0px" }}>{upload.file.name}</p>
                                <p style={{ fontSize: "12px", padding: "0px", margin: "0px" }}>{formatFileSize(upload.file.size)}</p>
                            </div>

                            <div className="progress-actions-holder">
                                <ProgressBar progress={upload.progress} />

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
                            </div>
                        </FileItem>
                    );
                })}
            </div>
        </div>
    );
};
