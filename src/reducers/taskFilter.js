import taskFilterTypes from '../constants/taskFilter'

const INITIAL_STATE = 'ALL'

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case taskFilterTypes.CHANGE_FILTER:
            return action.payload
        default:
            return state
    }
}

