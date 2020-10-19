import { SET_USER, SET_UNAUTHENTICATED, LOADING_USER, WATCH_LISTING, UNWATCH_LISTING } from '../types'

const initialState = {
    authenticated: false,
    loading: false,
    credentials: {},
    watches: [],
    notifications: []
}

export default function (state = initialState, action){
    switch(action.type){
        case SET_AUTHENTICATED: 
            return {
                ...state,
                authenticated: true
            };
        case SET_UNAUTHENTICATED: 
            return initialState;
        case SET_USER:
            return {
                authenticated: true,
                loading: false,
                ...action.payload
            }
        case LOADING_USER:
            return {
                ...state,
                loading: true
            }
        case WATCH_LISTING:
            return {
                ...state,
                watches: [
                    ...state.watches,
                    {
                        userHandle: state.credentials.handle,
                        listingId: actions.payload.listingId
                    }
                ]
            }
        case UNWATCH_LISTING: 
            return {
                ...state,
                watches: state.watches.filter(watch => watch.listingId !== action.payload.listingId)
            }
        default:
            return state;
    }
}