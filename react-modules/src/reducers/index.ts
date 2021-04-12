import { combineReducers } from 'redux';

interface ActionType {
  type: string;
  payload: any;
}


interface listingResultsAction extends ActionType {
payload : {
  totalItemsCount? : number;
  numberOfPages? : number;
  items: null | any[];
}
}

const listingResultsReducer = (state = {}, action: listingResultsAction) => {
switch (action.type) {
case 'SET_RESULTS':
  //Anyway to memoize results based on filters values?
  return {...action.payload};
  case 'CLEAR_RESULTS' : 
  return {}
  default:
    return state;
}
}


interface someListingFiltersAction extends ActionType {
  payload: {
    currentPage?: number;
  }
}

//If listing contains pagination, do remember to set currentPage:1 
const someListingFiltersReducer = (state = {currentPage: 1}, action: someListingFiltersAction) => {
  switch (action.type) {
    case 'UPDATE_FILTER':
      return { ...state, ...action.payload }
    default:
      return state
  }
}

export interface RootState {someListingFilters: {currentPage:1}; listingResults: {}}

export default combineReducers({
  someListingFilters:  someListingFiltersReducer,
  listingResults: listingResultsReducer
});