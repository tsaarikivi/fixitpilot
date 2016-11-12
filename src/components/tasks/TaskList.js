import React from 'react'

import TaskListItem from './TaskListItem'

export default class TaskList extends React.Component {

    render() {
        return (
            <div className="task-list">
                <h2>Duunilista : {this.renderFilter(this.props.taskFilter)}</h2>
                <ul>{this.renderTaskList()}</ul>
            </div>
        )
    }

    renderFilter(filter) {
        if (filter == 'ALL') return "Kaikki"
        if (filter == 'OWN') return "Omat"
        if (filter == 'FREE') return "Vapaat"
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