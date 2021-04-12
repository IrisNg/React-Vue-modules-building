import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Pagination from '../Pagination/Pagination';
import {
  filtersType,
  ListingBaseProps,
} from './listingBase.model';
//@ts-ignore
import { RootState } from '../../reducers/index.ts'
const ListingBase: React.FC<ListingBaseProps> = (props) => {
  const {
    modulesConfig,
    filtersStoreKey,
    updateFiltersAction,
    formatRequest,
    fetchListingAction,
    resultsStoreKey,
    formatResults,
    ListingContainer,
    ListItem,
  } = props;

  const hasPagination = !!modulesConfig.pagination;

  const filters = useSelector(
    (state: RootState) => {
      if (filtersStoreKey) {
        return state[filtersStoreKey]
      }
      return {}
    }
  );
  const results = useSelector(
    (state: RootState) => {
      if (resultsStoreKey) {
        return state[resultsStoreKey]
      }
      return {}
    }
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const requestParams = formatRequest
      ? formatRequest({ ...filters })
      : filters;

    //Refetch listing
    dispatch(fetchListingAction(requestParams));

    return () => { };
  }, [
    dispatch,
    fetchListingAction,
    filters,
    formatRequest,
  ]);

  const formattedResults = formatResults
    ? formatResults(results)
    : results,
    { totalItemsCount, numberOfPages } = formattedResults;

  const onPaginationPageChange = (
    selectedPageNumber: number
  ) => {
    if (updateFiltersAction) {
      dispatch(
        updateFiltersAction({
          currentPage: selectedPageNumber,
        })
      );
    }
  };

  return (
    <div className="listing">
      <ListingContainer { ...formattedResults }>
        { ListItem &&
          formattedResults.items &&
          formattedResults.items.map(
            (item: { [key: string]: any }) => (
              <ListItem { ...item } key={ item.id }></ListItem>
            )
          ) }
      </ListingContainer>
      {hasPagination && (
        <Pagination
          { ...modulesConfig.pagination }
          currentPage={ filters.currentPage || 1 }
          totalItemsCount={ totalItemsCount }
          numberOfPages={ numberOfPages }
          onPageChange={ onPaginationPageChange }
        />
      ) }
    </div>
  );
};

export default ListingBase;
