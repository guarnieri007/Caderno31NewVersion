// components/common/UploadArea.tsx
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FileItem, ProgressBar, UploadWrapper } from "../styles/common/uploadArea";
import Icon from "../icons/icon";
import { UIIcons } from "../icons";
import { formatFileSize } from "../../helper/file-size-convertions";
import { useUploadFiles } from "../../context/UploadFiles";
import { UploadItemsHolder } from "../styles/common/upload-styles";

export const UploadArea = () => {
    const {
        uploads,
        addFiles,
        pauseUpload,
        resumeUpload,
        retryUpload,
        removeUpload,
    } = useUploadFiles();

    const onDrop = useCallback((acceptedFiles: File[]) => {
        addFiles(acceptedFiles);
    }, [addFiles]);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        multiple: true,
    });

    return (
        <div style={{ width: "100%", height: "auto" }}>
            <UploadWrapper {...getRootProps()}>
                <input {...getInputProps()} />
                <p>📁 Drag and drop or click here to send your files</p>
            </UploadWrapper>

            <UploadItemsHolder>
                {uploads.map((upload) => {
                    const type = upload.file.type.startsWith("image")
                        ? "Image"
                        : upload.file.type.startsWith("video")
                            ? "Video"
                            : upload.file.type.startsWith("audio")
                                ? "Audio"
                                : "Unknown";

                    return (
                        <FileItem key={upload.file.name + upload.file.size}>
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
                                        <button onClick={() => pauseUpload(upload.file)}>⏸️</button>
                                    )}
                                    {upload.status === "paused" && (
                                        <button onClick={() => resumeUpload(upload.file)}>▶️</button>
                                    )}
                                    {upload.status === "error" && (
                                        <button onClick={() => retryUpload(upload.file)}>🔁</button>
                                    )}
                                    <button onClick={() => removeUpload(upload.file)}>❌</button>
                                </div>
                            </div>
                        </FileItem>
                    );
                })}
            </UploadItemsHolder>
        </div>
    );
};
