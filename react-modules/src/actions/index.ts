import axios from 'axios';
import {Dispatch} from 'redux';
import {filtersType} from '../components/ListingBase/listingBase.model';


export const fetchListing = (requestParams: filtersType) => async (dispatch:Dispatch) =>{
  try {
    const response = await axios.get('/listing');
    dispatch({ type: 'SOMETHING', payload: response.data });
 } catch (err) {
    dispatch({type: 'GLOBAL_ERROR'});
 }

}