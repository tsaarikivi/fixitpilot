import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import taskFilterActions from '../../actions/taskFilter'

require('./taskFilter.scss')

class TaskFilter extends React.Component {

    render() {
        return (
            <div className="task-filter">
                {this.renderFilters()}
            </div>
        )
    }

    renderFilters() {
        const { changeFilter } = this.props.taskFilterActions
        if (this.props.auth) {
            return <ul>
                <li onClick={() => changeFilter('ALL')}><img src="./images/task.svg" alt="tasks" />Kaikki</li>
                <li onClick={() => changeFilter('FREE')}><img src="./images/task.svg" alt="tasks" />Vapaat</li>
                <li onClick={() => changeFilter('OWN')}><img src="./images/owntask.svg" alt="owntasks" />Omat</li>
            </ul>
        }
        return <ul>
            <li onClick={() => changeFilter('ALL')}><img src="./images/task.svg" alt="tasks" />Kaikki</li>
            <li onClick={() => changeFilter('FREE')}><img src="./images/task.svg" alt="tasks" />Vapaat</li>
        </ul>
    }
}

function mapDispatchToProps(dispatch) {
    return {
        taskFilterActions: bindActionCreators(taskFilterActions, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(TaskFilter)