// searchFilters.odt.ts
export interface SearchFilterItem {
  id: string;
  name: string;
}

export interface SearchResults {
  creators: SearchFilterItem[];
  languages: SearchFilterItem[];
  postCategories: SearchFilterItem[];
  postTypes: SearchFilterItem[];
}