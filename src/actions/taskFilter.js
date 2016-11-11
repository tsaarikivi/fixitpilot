import taskFilterTypes from '../constants/taskFilter'

const changeFilter = newFilter => {
    return dispatch => {
        dispatch({
            type: taskFilterTypes.CHANGE_FILTER,
            payload: newFilter
        })
    }
}

const actions = {
    changeFilter
}

export default actions