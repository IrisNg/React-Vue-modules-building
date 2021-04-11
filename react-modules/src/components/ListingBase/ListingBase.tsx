import React, { useState, useEffect } from 'react'

import Pagination, { PaginationProps } from '../Pagination/Pagination';

type filtersType = {
  [key: string]: string | number;
} & { currentPage?: number; }

interface ListingBaseProps {
  modulesConfig: {
    pagination?: PaginationProps;
  };

  fetchListingAction: (requestParams: filtersType) => { type: string; payload?: any };
  formatRequest: (filters: filtersType) => filtersType;
}


const ListingBase: React.FC<ListingBaseProps> = (props) => {
  const { modulesConfig, formatRequest, fetchListingAction } = props;

  const hasPagination = !!modulesConfig.pagination;

  const initFilters: filtersType = {};

  if (hasPagination) initFilters.currentPage = 1;

  const [filters, setFilters] = useState<filtersType>(initFilters);
  const [fetchResponse, setFetchResponse] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    const requestParams = formatRequest ? formatRequest(filters) : filters;

    //Refetch
    fetchListingAction(requestParams);

    return () => { }
  }, [fetchListingAction, filters, formatRequest])



  const onPaginationPageChange = (selectedPageNumber: number) => {
    setFilters((prevState) => ({ ...prevState, currentPage: selectedPageNumber }))
  }




  return (<div className="listing">
    {hasPagination && <Pagination { ...modulesConfig.pagination } currentPage={ filters.currentPage || 1 } onPageChange={ onPaginationPageChange } /> }
  </div>)

}

export default ListingBase;