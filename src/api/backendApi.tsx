import api from './axiosInstance';

export const HomeApi = () => {
  const backendURL = `${import.meta.env.VITE_BACKEND_PROTOCOAL}://${import.meta.env.VITE_BACKEND_HOST}:${import.meta.env.VITE_BACKEND_PORT}/api/`;
  
  const FetchBestOfMonth = async () => {
    return (await api.get(`${backendURL}bestOfMonth`)).data;
  };

  const FetchContentCreators = async () => {
    return (await api.get(`${backendURL}contentCreator`)).data;
  };

  const FetchBanners = async () => {
    return (await api.get(`${backendURL}banners`)).data;
  };

  const FetchHeroBanners = async () => {
    return (await api.get(`${backendURL}hero`)).data;
  };

  return {
    FetchBanners,
    FetchBestOfMonth,
    FetchContentCreators,
    FetchHeroBanners
  }

}

