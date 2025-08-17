// src/api/upload.tsx
import { getAccessToken, setAccessToken } from "../context/AuthTokenSingleton";
import { AuthAPI } from "./auth";
import { isAuthError } from './authError';

export const UploadAPI = () => {
  const backendURL = `${import.meta.env.VITE_BACKEND_PROTOCOAL}://${import.meta.env.VITE_BACKEND_HOST}:${import.meta.env.VITE_BACKEND_PORT}/api/upload/`;

  const fetchWithAuthRetry = async (
    request: (token: string) => Promise<Response>,
    retry = false
  ): Promise<Response> => {
    const token = getAccessToken() || '';
    const response = await request(token);

    let backendMessage: string | undefined;
    try {
      const json = await response.clone().json();
      backendMessage = json?.message;
    } catch {
      /* ignore */
    }

    if (!retry && isAuthError(response.status, backendMessage)) {
      const { requestAccessTokenRefresh } = AuthAPI();
      const newToken = await requestAccessTokenRefresh();
      if (newToken) {
        setAccessToken(newToken);
        return fetchWithAuthRetry(request, true);
      }
    }

    return response;
  };

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

          const authError = !retry && isAuthError(xhr.status, backendMessage);

          if (authError) {
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

  const mergeChunks = async (fileId: string, fileName: string, format: string) => {
    return fetchWithAuthRetry((token) =>
      fetch(`${backendURL}merge-chunks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ fileId, fileName, format }),
      })
    );
  };

  const cancelUpload = async (fileId: string, format: string = "") => {
    await fetchWithAuthRetry((token) =>
      fetch(`${backendURL}cancel-upload`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ fileId, format }),
      })
    );
  };

  return {
    uploadChunk,
    mergeChunks,
    cancelUpload,
  };
};
