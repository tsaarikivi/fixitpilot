import { createSelector } from 'reselect'

const getTasks = state => state.tasks
const getFilter = state => state.taskFilter
const getAuth = state => state.auth

const getOwnTasks = (tasks, key) => {
    let ret = {}
    for (let task in tasks) {
        if (tasks[task].assignee == key) {
            ret[task] = tasks[task]
        }
    }
    return ret
}

const getFreeTasks = (tasks) => {
    let ret = {}
    for (let task in tasks) {
        if (!tasks[task].assignee) {
            ret[task] = tasks[task]
        }
    }
    return ret
}

export const getVisibleTasks = createSelector(
    [getTasks, getFilter, getAuth],
    (tasks, filter, auth) => {
        switch (filter) {
            case 'ALL':
                return tasks
            case 'OWN':
                if (auth) return getOwnTasks(tasks, auth.uid)
                return tasks
            case 'FREE':
                return getFreeTasks(tasks)
            default:
                return tasks
        }
    }
)