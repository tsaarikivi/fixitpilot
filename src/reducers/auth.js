import authTypes from '../constants/auth'

const INITIAL_STATE = null

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case authTypes.LOGOUT:
            return INITIAL_STATE
        case authTypes.LOGIN:
            return Object.assign({}, state, action.payload);
        default:
            return state
    }
}

