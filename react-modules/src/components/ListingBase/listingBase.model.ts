import {Dispatch} from 'redux';
import { StaticPaginationProps } from '../Pagination/Pagination';

export type filtersType = {
  [key: string]: string | number | boolean;
} & { currentPage?: number; }

export interface ListingBaseProps {
  modulesConfig: {
    pagination?: StaticPaginationProps;
  };
  filtersStoreKey?: string;
  updateFiltersAction?: (newFiltersKeyValues: filtersType) => {type: string; payload: {[key:string]:any;}};
  formatRequest?: (filters: filtersType) => filtersType;
  fetchListingAction: (requestParams: filtersType)=> (dispatch:Dispatch) => Promise<void>;
  resultsStoreKey: string;
  formatResults?: (response: { [key: string]: any }) => { totalItemsCount?: number; numberOfPages?: number; items?: any[] }
  ListingContainer : React.ComponentType;
  listingContainerConfig?: {[key:string]:any};
  ListingItem?:React.ComponentType<{item:any}>;
}
 