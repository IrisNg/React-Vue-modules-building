import { PaginationProps } from '../Pagination/Pagination';

export type filtersType = {
  [key: string]: string | number;
} & { currentPage?: number; }

export interface ListingBaseProps {
  modulesConfig: {
    pagination?: PaginationProps;
  };
  filtersStoreKey?: string;
  updateFiltersAction?: (newFiltersKeyValues: filtersType) => { type: string; payload: filtersType };
  formatRequest?: (filters: filtersType) => filtersType;
  fetchListingAction: (requestParams: filtersType) => { type: string; payload?: any };
  resultsStoreKey: string;
  formatResults?: (response: { [key: string]: any }) => { totalItemsCount?: number; numberOfPages?: number; items?: any[] }
  ListingContainer : React.ComponentType;
  ListItem?:React.ComponentType;
}
