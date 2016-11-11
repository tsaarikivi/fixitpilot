import firebase from 'firebase'

import tasksTypes from '../constants/tasks'

const fetchTasks = () => {
    const ref = firebase.database().ref('tasks')
    return dispatch => {
        ref.orderByChild('assignee').equalTo(false).on('value', data => {
            dispatch({
                type: tasksTypes.FETCH_TASKS,
                payload: data.val()
            }, error => {
                console.error(error)
            })
        })
    }
}

const actions = {
    fetchTasks
}

export default actions