import React from 'react'

import { Link } from 'react-router'

export default class TaskList extends React.Component {

    render() {
        const ref = '/task/' + this.props.taskId
        const { task } = this.props
        return (
            <li>
                <Link to={ref}><label>{task.title}</label><br /><small>{task.address}</small><br />{this.renderDoing(task)}</Link>
            </li>
        )
    }

    renderDoing(task) {
        if (task.assignee) return <small>Duuni on otettu vastaan</small>
        return <small className="text-green bold">Duuni vapaa</small>
    }
}