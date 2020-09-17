import { SET_ERRORS } from "../types";
import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI } from '../types'

import axios from 'axios'

export const loginUser = userData => dispatch => {
    dispatch({ type: LOADING_UI });
    axios.post('/login', userData)
    .then(res => {
        console.log(res.data)
        const FBIdToken = `Bearer ${res.data.token}`
        localStorage.setItem('FBIdToken', FBIdToken)
        axios.defaults.headers.common['Authorization'] = FBIdToken;
        setLoginProperties({ ...loginProperties, loading: false })
        dispatch(getUserData())
        props.history.push('/')
    })
    .catch(err => {
        setLoginProperties({ ...loginProperties, errors: err.response.data, loading: false })
    })
}

export const getUserData = () => dispatch => {
    axios.get('/user')
        .then(res => {
            dispatch({
                type: SET_USER,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err)
        })
}