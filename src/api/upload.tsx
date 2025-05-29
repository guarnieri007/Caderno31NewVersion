import api from './axiosInstance';

export const UploadAPI = () => {
    const backendURL = `${import.meta.env.VITE_BACKEND_PROTOCOAL}://${import.meta.env.VITE_BACKEND_HOST}:${import.meta.env.VITE_BACKEND_PORT}/api/`;

    const uploadFile = async (file: File, path: string) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await api.post(`${backendURL}${path}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });

            return response.data;
        } catch (error) {
            console.error('Error uploading file:', error);
            throw error;
        }
    };

    return {
        uploadFile,
    };
};
