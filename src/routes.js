import React from 'react'
import { Route, IndexRoute, IndexRedirect } from 'react-router'

import Layout from './components/layout'
import Login from './components/login'
import NewTask from './components/newTask'
import NotFound from './components/notFound'
import Register from './components/register'
import Task from './components/task'
import Tasks from './components/tasks'

export default (
    <Route path="/" component={Layout}>
        <IndexRedirect to="/tasks" />
        <Route path="/tasks" component={Tasks} />
        <Route path="/task/:taskId" component={Task} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/newTask" component={NewTask} />
        <Route path="*" component={NotFound} />
    </Route>
)