import { BannerProps, CreatorChipProps, HeroProps, ItemAsCardProps } from "../component/interfaces";

async function fetchData<T>(endpoint: string): Promise<T> {
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data as T;
};

export const FetchBestOfMonth = async (): Promise<ItemAsCardProps[]> => {
  return await fetchData('/api/bestofmonth');
};

export const FetchContentCreators = async (): Promise<CreatorChipProps[]> => {
  return await fetchData('api/contentCreator');
};

export const FetchBanners = async (): Promise<BannerProps[]> => {
  return await fetchData('api/bannerItems');
};

export const FetchHeroBanners = async (): Promise<HeroProps[]> => {
  return await fetchData('api/heroBanners');
};
