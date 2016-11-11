import React from 'react'

import { Link } from 'react-router'

export default class TaskList extends React.Component {

    render() {
        const ref = '/task/' + this.props.taskId
        const { task } = this.props
        return (
            <li>
                <Link to={ref}><label>{task.title}</label><br /><small>{task.address}</small></Link>
            </li>
        )
    }
}