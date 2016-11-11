import firebase from 'firebase'

import authTypes from '../constants/auth'

export function logout() {
    return dispatch => {
        dispatch({
            type: authTypes.LOGOUT
        })
    }
}

export function login(user) {
    return dispatch => {
        dispatch({
            type: authTypes.LOGIN,
            payload: user
        })
    }
}