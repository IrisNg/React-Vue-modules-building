import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

//@ts-ignore
import { RootState } from '../../reducers/index.ts'

type filtersType = {
  [key: string]: string | number | boolean;
} & { currentPage?: number; }

interface filterComponent {
  Component: React.ComponentType<any>;
  props: {[key: string]: any};
}

interface ListingFiltersProps {
  Components: (filterComponent[] | filterComponent)[];
  filtersStoreKey: string;
  updateFiltersAction: (newFiltersKeyValues: filtersType) => { type: string; payload: { [key: string]: any; } };
}

const ListingFilters: React.FC<ListingFiltersProps> = (props) => {
  const { Components, filtersStoreKey, updateFiltersAction } = props;

  const dispatch = useDispatch()

  const filters = useSelector(
    (state: RootState) => {
      return state[filtersStoreKey]
    }
  )

  const onFilterChange = (newKeyValues: filtersType) => {
    dispatch(updateFiltersAction({ ...filters, ...newKeyValues }))
  }

  return (<div className="listing-filters"><form>
    </form></div>)
}

export default ListingFilters;