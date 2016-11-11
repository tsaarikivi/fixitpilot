import firebase from 'firebase'

import taskTypes from '../constants/task'

const fetchTask = taskId => {
    const ref = firebase.database().ref('tasks').child(taskId)
    return dispatch => {
        ref.on('value', data => {
            dispatch({
                type: taskTypes.FETCH_TASK,
                payload: data.val()
            })
        }, error => {
            console.error(error)
        })
    }
}

const actions = {
    fetchTask
}

export default actions