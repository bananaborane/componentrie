import { SET_LISTINGS, WATCH_LISTING, UNWATCH_LISTING, LOADING_DATA } from '../types';

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
        case WATCH_LISTING:
        case UNWATCH_LISTING:
            let index = state.listings.findIndex(listing => listing.listingId === action.payload.listingId);
            state.listings[index] = action.payload
            return {
                ...state
            }
        default:
            return state
    }
}