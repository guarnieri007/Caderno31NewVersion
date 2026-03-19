import { SearchFilterItem, SearchResults } from '../interfaces';
import api from './axiosInstance';

export type SearchCategoryKey = keyof SearchResults;

interface FetchFiltersPayload {
  lang: string;
  limit?: number;
}

interface SearchCategoryPayload extends FetchFiltersPayload {
  category: SearchCategoryKey;
  search: string;
}

export const SearchFilters = () => {
  const backendURL = `${import.meta.env.VITE_BACKEND_PROTOCOAL}://${import.meta.env.VITE_BACKEND_HOST}:${import.meta.env.VITE_BACKEND_PORT}/api/searchFilters`;

  const emptyResult: SearchResults = {
    creators: [],
    languages: [],
    postCategories: [],
    postTypes: [],
  };

  const fetchFiltersAvailables = async ({ lang, limit = 15 }: FetchFiltersPayload): Promise<SearchResults> => {
    const result: SearchResults = (await api.post(`${backendURL}`, { lang, limit }).catch((error) => {
      console.error('Error fetching filters:', error);
      return { data: emptyResult };
    })).data;

    return result;
  };

  const searchCategoryItems = async ({ category, search, lang, limit = 15 }: SearchCategoryPayload): Promise<SearchFilterItem[]> => {
    const result: SearchFilterItem[] = (await api.post(`${backendURL}/${category}`, { search, lang, limit }).catch((error) => {
      console.error(`Error fetching ${category}:`, error);
      return { data: [] };
    })).data;

    return result;
  };

  return {
    fetchFiltersAvailables,
    searchCategoryItems,
  };
};
