import tasksTypes from '../constants/tasks'

const INITIAL_STATE = null

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case tasksTypes.FETCH_TASKS:
            return Object.assign({}, state, action.payload);
        default:
            return state
    }
}

