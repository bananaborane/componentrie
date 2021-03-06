import { SET_LISTINGS, WATCH_LISTING, UNWATCH_LISTING, LOADING_DATA, DELETE_LISTING, POST_LISTING, SET_LISTING } from '../types';

const initialState = {
    listings: [],
    listing: {},
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            }
        case SET_LISTINGS:
            return {
                ...state,
                listings: action.payload,
                loading: false
            }
        case SET_LISTING:
            return {
                ...state,
                listing: action.payload
            }
        case WATCH_LISTING:
        case UNWATCH_LISTING: 
            let index = state.listings.findIndex(listing => listing.listingId === action.payload.listingId);
            state.listings[index] = action.payload
            return {
                ...state
            }
        case DELETE_LISTING:
            index = state.listings.findIndex(listing => listing.listingId === action.payload);
            state.listings.splice(index, 1);
            return {
                ...state
            }
        case POST_LISTING:
            return {
                ...state,
                listings: [
                    action.payload,
                    ...state.listings
                ]
            }
        default:
            return state
    }
}