import api from './axiosInstance';

export const RedisErrorsAPI = () => {
    const backendURL = `${import.meta.env.VITE_BACKEND_PROTOCOAL}://${import.meta.env.VITE_BACKEND_HOST}:${import.meta.env.VITE_BACKEND_PORT}/api/maintenance`;
    const fetchRedisErrors = async () => {
        const result = (await api.get(`${backendURL}/file-optimization/failed`).catch((error) => {
            console.error('Error fetching Redis errors:', error);
            return { data: [] };
        })).data;
        return result;
    }

    return {
        fetchRedisErrors,
    }
}