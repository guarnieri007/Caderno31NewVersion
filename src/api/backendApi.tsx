import { BannerProps, CreatorChipProps, ItemAsCardProps } from "../component/interfaces";

export const FetchBestOfMonth = async ():Promise<ItemAsCardProps[]> => {
  const response = await fetch('/api/bestofmonth');
  const data = await response.json();

  return data as ItemAsCardProps[]; 
};

export const FetchContentCreators = async ():Promise<CreatorChipProps[]> => {
  const response = await fetch('api/contentCreator');
  const data = await response.json();

  return data as CreatorChipProps[];
};

export const FetchBanners = async () => {
  const response = await fetch('api/bannerItems');
  const data: BannerProps[] = await response.json();

  return data;
};