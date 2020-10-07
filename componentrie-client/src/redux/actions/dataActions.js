import { SET_LISTINGS, LOADING_DATA, WATCH_LISTING, UNWATCH_LISTING } from '../types';
import axios from 'axios';



// get all listings
export const getListings = () => dispatch => {
    dispatch({ type: LOADING_DATA })
    axios.get('/listings')
        .then(res => {
            dispatch({ 
                type: SET_LISTINGS,
                payload: res.data
             })
        })
        .catch(err => {
            dispatch({
                type: SET_LISTINGS,
                payload: []
            })
        })
}


// watch a listing



// unwatch a listing