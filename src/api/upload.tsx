export const UploadAPI = () => {
  const backendURL = `${import.meta.env.VITE_BACKEND_PROTOCOAL}://${import.meta.env.VITE_BACKEND_HOST}:${import.meta.env.VITE_BACKEND_PORT}/api/`;

  const uploadChunk = (file: File, chunkIndex: number, chunkSize: number, fileId: string, totalChunks: number, onProgress: (percent: number) => void, onSuccess: () => void, onError: (error: string) => void): XMLHttpRequest => {
    const start = chunkIndex * chunkSize;
    const end = Math.min(start + chunkSize, file.size);
    const chunk = file.slice(start, end);

    const xhr = new XMLHttpRequest();
    const formData = new FormData();

    formData.append("chunk", chunk);
    formData.append("fileName", file.name);
    formData.append("fileId", fileId);
    formData.append("chunkIndex", chunkIndex.toString());
    formData.append("totalChunks", totalChunks.toString());

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100);
        onProgress(percent);
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) onSuccess();
      else onError(xhr.statusText);
    };

    xhr.onerror = () => {
      onError(xhr.statusText);
    };

    xhr.open("POST", `${backendURL}upload-chunk`);
    xhr.send(formData);

    return xhr;
  };

  const mergeChunks = async (fileId: string, fileName: string) => {
    const response = await fetch(`${backendURL}merge-chunks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileId, fileName }),
    });
    return await response.json();
  };

  const cancelUpload = async (fileId: string) => {
    await fetch(`${backendURL}cancel-upload`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileId }),
    });
  };

  return {
    uploadChunk,
    mergeChunks,
    cancelUpload,
  };
};