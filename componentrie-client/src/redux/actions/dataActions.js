import { SET_LISTINGS, LOADING_DATA, WATCH_LISTING, UNWATCH_LISTING, DELETE_LISTING, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, POST_LISTING, SET_LISTING, STOP_LOADING_UI } from '../types';
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


export const getListing = (listingId) => dispatch => {
    dispatch({ type: LOADING_UI })
    axios.get(`/listing/${listingId}`)
        .then(res => {
            dispatch({
                type: SET_LISTING,
                payload: res.data
            })
            dispatch({ type: STOP_LOADING_UI })
        })
        .catch(err => console.log(err))
}


// Post a listing

export const postListing = newListing => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post('/listing', newListing)
        .then(res => {
            dispatch({
                type: POST_LISTING,
                payload: res.data
            })
            dispatch({ type: CLEAR_ERRORS })
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}


// watch a listing
export const watchListing = listingId => dispatch => {
    axios.get(`/listing/${listingId}/watch`)
        .then(res => {
            dispatch({
                type: WATCH_LISTING,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err)
        })
}


// unwatch a listing
    export const unwatchListing = listingId => dispatch => {
        axios.get(`/listing/${listingId}/unwatch`)
            .then(res => {
                dispatch({
                    type: UNWATCH_LISTING,
                    payload: res.data
                })
            })
            .catch(err => {
                console.log(err)
            })
    }


export const deleteListing = listingId => {
    axios.delete(`/listing/${listingId}`)
        .then(() => {
            dispatch({ type: DELETE_LISTING, payload: listingId })
        })
        .catch(err => {
            console.log(err)
        })
}

export const clearErrors = () => dispatch => {
    dispatch({ type: CLEAR_ERRORS })
}

