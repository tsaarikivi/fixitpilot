import React from 'react'

import TaskListItem from './TaskListItem'

export default class TaskList extends React.Component {

    render() {
        return (
            <div className="task-list">
                <h2>Duunilista</h2>
                <ul>{this.renderTaskList()}</ul>
            </div>
        )
    }

    renderTaskList() {
        const { tasks } = this.props
        let ret = []
        for (const task in tasks) {
            ret.push(<TaskListItem key={task} taskId={task} task={tasks[task]} />)
        }
        return ret;
    }
}