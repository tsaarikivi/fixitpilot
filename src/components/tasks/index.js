import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import tasksActions from '../../actions/tasks'
import firebase from 'firebase'

import { getVisibleTasks } from '../../selectors/tasks'

import TaskFilter from './TaskFilter'
import TaskList from './TaskList'

class Tasks extends React.Component {
    componentDidMount() {
        this.props.tasksActions.fetchTasks()
    }

    componentWillUnmound() {
        firebase.database().ref('tasks').off()
    }

    render() {
        return (
            <div className="tasks-view">
                <h1>Duunit</h1>
                {this.renderNewTaskLink()}
                {this.renderTaskFilter()}
                {this.renderTaskList()}
            </div>
        )
    }

    renderNewTaskLink() {
        const { auth } = this.props
        if (auth) {
            if (auth.coordinator) return <Link className="link-btn" to="/newTask">Lisää uusi duuni</Link>
        }
    }

    renderTaskFilter() {
        return <TaskFilter auth={this.props.auth} />
    }

    renderTaskList() {
        let { taskFilter } = this.props
        let {tasks} = this.props
        return <TaskList tasks={tasks} taskFilter={taskFilter} />
    }
}



function mapStateToProps(state) {
    return { tasks: getVisibleTasks(state), taskFilter: state.taskFilter, auth: state.auth }
}

function mapDispatchToProps(dispatch) {
    return {
        tasksActions: bindActionCreators(tasksActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tasks)