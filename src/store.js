import { combineReducers } from 'redux'

import auth from './reducers/auth'
import { reducer as form } from 'redux-form'
import tasks from './reducers/tasks'
import task from './reducers/task'
import taskFilter from './reducers/taskFilter'

const store = combineReducers({
    auth,
    form,
    task,
    tasks,
    taskFilter
})

export default store