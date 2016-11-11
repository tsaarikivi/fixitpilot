import taskTypes from '../constants/task'

const INITIAL_STATE = null

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case taskTypes.FETCH_TASK:
            return Object.assign({}, state, action.payload)
        default:
            return state
    }
}

