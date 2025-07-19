// src/api/upload.tsx
import { getAccessToken, setAccessToken } from "../context/AuthTokenSingleton";
import { AuthAPI } from "./auth";

export const UploadAPI = () => {
  const backendURL = `${import.meta.env.VITE_BACKEND_PROTOCOAL}://${import.meta.env.VITE_BACKEND_HOST}:${import.meta.env.VITE_BACKEND_PORT}/api/upload/`;

  const uploadChunk = (
    file: File,
    chunkIndex: number,
    chunkSize: number,
    fileId: string,
    totalChunks: number,
    onProgress: (percent: number) => void,
    onSuccess: () => void,
    onError: (error: string) => void,
    token?: string | null
  ): XMLHttpRequest => {
    const sendChunk = (accessToken: string | null, retry = false) => {
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

      xhr.onload = async () => {
        if (xhr.status === 200) {
          onSuccess();
        } else {
          // Try to extract backend message
          let backendMessage = xhr.statusText;
          try {
            const json = JSON.parse(xhr.responseText || '{}');
            if (json.message) backendMessage = json.message;
          }
          catch {
            return;
          }

          const isAuthError = !retry && (
            xhr.status === 403 ||
            backendMessage === 'Token inválido ou expirado' ||
            backendMessage === 'Token não fornecido'
          );

          if (isAuthError) {
            // token expirado ou inválido
            try {
              const { requestAccessTokenRefresh } = AuthAPI();
              const newToken = await requestAccessTokenRefresh();
              if (newToken) {
                setAccessToken(newToken);
                sendChunk(newToken, true); // tenta de novo
              } else {
                onError("Unauthorized and no token refresh");
              }
            } catch (err) {
              onError(`Token refresh failed. error: ${err}`);
            }
          } else {
            onError(xhr.statusText);
          }

        }
      };

      xhr.onerror = () => {
        onError("Network error");
      };

      xhr.open("POST", `${backendURL}upload-chunk`);
      if (accessToken) {
        xhr.setRequestHeader("Authorization", `Bearer ${accessToken}`);
      }
      xhr.send(formData);

      return xhr;
    };

    // inicia com o token atual
    return sendChunk(token || getAccessToken());
  };

  const mergeChunks = async (fileId: string, fileName: string) => {
    const token = getAccessToken();
    const response = await fetch(`${backendURL}merge-chunks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ fileId, fileName }),
    });

    if (response.status === 401 || response.status === 403) {
      const { requestAccessTokenRefresh } = AuthAPI();
      const newToken = await requestAccessTokenRefresh();
      if (newToken) {
        setAccessToken(newToken);
        return fetch(`${backendURL}merge-chunks`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${newToken}`,
          },
          body: JSON.stringify({ fileId, fileName }),
        });
      }
    }

    return response;
  };

  const cancelUpload = async (fileId: string, fileName: string) => {
    const token = getAccessToken();
    await fetch(`${backendURL}cancel-upload`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ fileId, fileName }),
    });
  };

  return {
    uploadChunk,
    mergeChunks,
    cancelUpload,
  };
};
