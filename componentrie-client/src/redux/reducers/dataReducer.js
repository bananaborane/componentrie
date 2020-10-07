import { SET_LISTINGS, WATCH_LISTING, UNWATCH_LISTING, LOADING_DATA } from '../types';

const initialState = {
    listings: [],
    listing: {},
    loading: false
}

export default function(state = initialState, actions){
    switch(actions.type){
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            }
        case SET_LISTINGS:
            return {
                ...state,
                listings: actions.payload,
                loading: false
            }
        case WATCH_LISTING:
            return {}
        default:
            return state
    }
}