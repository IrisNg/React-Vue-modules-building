import React, { useState, useEffect } from 'react'

import Pagination from '../Pagination/Pagination';
import { filtersType, ListingBaseProps } from './listingBase.model';


const ListingBase: React.FC<ListingBaseProps> = (props) => {
  const { modulesConfig, formatRequest, fetchListingAction } = props;

  const hasPagination = !!modulesConfig.pagination;

  const initFilters: filtersType = {};

  if (hasPagination) initFilters.currentPage = 1;

  const [filters, setFilters] = useState<filtersType>(initFilters);
  const [fetchResponse, setFetchResponse] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    const requestParams = formatRequest ? formatRequest(filters) : filters;

    //Refetch listing
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