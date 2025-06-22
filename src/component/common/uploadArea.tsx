// components/common/UploadArea.tsx
import { useCallback, useRef, useState } from "react";
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
    // pauseUpload,
    // resumeUpload,
    retryUpload,
    removeUpload,
  } = useUploadFiles();

  const [videoThumbs, setVideoThumbs] = useState<Record<string, string>>({});
  const generatedThumbs = useRef<Set<string>>(new Set());

  const generateThumbnail = (file: File) => {
    return new Promise<string | null>((resolve) => {
      const video = document.createElement("video");
      video.preload = "metadata";
      video.src = URL.createObjectURL(file);
      video.muted = true;
      video.playsInline = true;

      video.onloadedmetadata = () => {
        if (video.duration < 6) {
          resolve(null); // Use fallback icon
          return;
        }
        video.currentTime = 6;
      };

      video.onseeked = () => {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) return resolve(null);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataURL = canvas.toDataURL("image/jpeg");
        resolve(dataURL);
      };

      video.onerror = () => resolve(null);
    });
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    addFiles(acceptedFiles);
    acceptedFiles.forEach((file) => {
      if (file.type.startsWith("video") && !generatedThumbs.current.has(file.name)) {
        generateThumbnail(file).then((thumb) => {
          if (thumb) {
            setVideoThumbs((prev) => ({ ...prev, [file.name]: thumb }));
          }
          generatedThumbs.current.add(file.name);
        });
      }
    });
  }, [addFiles]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
  });

  return (
    <div style={{ width: "100%", height: "auto" }}>
      <UploadWrapper {...getRootProps()}>
        <input {...getInputProps()} />
        <p><Icon icon={UIIcons.Anexo} size={25} color="#FFF" />Drag and drop or click here to send your files</p>
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
                {type === "Video" && videoThumbs[upload.file.name] ? (
                  <img
                    src={videoThumbs[upload.file.name]}
                    style={{ maxHeight: "100%", maxWidth: "100%" }}
                    alt="video thumbnail"
                  />
                ) : type === "Video" ? (
                  <Icon icon={UIIcons.Video} size={25} />
                ) : null}
                {type === "Audio" && (
                  <Icon icon={UIIcons.Audio} style={{ maxHeight: "100%", maxWidth: "100%" }} size={25} />
                )}
                {type === "Unknown" && (
                  <Icon icon={UIIcons.Book} style={{ maxHeight: "100%", maxWidth: "100%" }} size={25} />
                )}
              </div>

              <div className="description" style={{ flex: 1 }}>
                <strong>{type} {upload.status}</strong>
                <p style={{ fontSize: "12px", padding: "0px", margin: "0px", }}>{upload.file.name}</p>
                <p style={{ fontSize: "11px", padding: "0px", margin: "0px" }}>{formatFileSize(upload.file.size)}</p>
              </div>

              <div className="progress-actions-holder">
                <div className="actions">
                  {/* {upload.status === "uploading" && (
                    <Icon onClick={() => pauseUpload(upload.file)} icon={UIIcons.Pause} size={26} />
                  )}
                  {(upload.status === "paused" || upload.status === "waiting") && (
                    <Icon onClick={() => resumeUpload(upload.file)} icon={UIIcons.Play} size={26} />
                  )} */}
                  {upload.status === "error" && (
                    <Icon onClick={() => retryUpload(upload.file)} icon={UIIcons.RetryError} size={26} />
                  )}
                  <Icon onClick={() => removeUpload(upload.file)} icon={UIIcons.Trash} size={26} />
                </div>
                <div>

                  <p style={{ fontSize: "12px", padding: "0px", margin: "0px", textAlign: "center" }}>{upload.progress.toFixed(0)}%</p>
                  <ProgressBar progress={upload.progress} />
                </div>

              </div>
            </FileItem>
          );
        })}
      </UploadItemsHolder>
    </div>
  );
};
