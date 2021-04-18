import axios from 'axios';
import {Dispatch} from 'redux';
import {filtersType} from '../components/ListingBase/listingBase.model';


export const fetchListing = (requestParams: filtersType = {}) => async (dispatch:Dispatch) =>{
  try {
    const response = await axios.post('https://run.mocky.io/v3/70cfcc67-caa2-42ab-a734-2a84d29ab339', requestParams);
    if (!response.data.message) {
       dispatch({ type: 'SET_RESULTS', payload: response.data });
    } else {
       dispatch({type: 'GLOBAL_ERROR', payload: response.data.message});
      }
    //Add dispatch error message
 } catch (err) {
    dispatch({type: 'GLOBAL_ERROR', payload: err});
 }

}

//newFiltersKeyValues can contain one, multiple or all filters key values
//if not all filters, only selected filters will be updated 
export const updateSomeListingFilters = (newFiltersKeyValues: filtersType) => {
   return { type: 'UPDATE_FILTER', payload: newFiltersKeyValues}
}