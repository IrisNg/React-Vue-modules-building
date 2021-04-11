import { PaginationProps } from '../Pagination/Pagination';

export type filtersType = {
  [key: string]: string | number;
} & { currentPage?: number; }

export interface ListingBaseProps {
  modulesConfig: {
    pagination?: PaginationProps;
  };

  fetchListingAction: (requestParams: filtersType) => { type: string; payload?: any };
  formatRequest?: (filters: filtersType) => filtersType;
}
