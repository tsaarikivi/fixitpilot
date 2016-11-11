import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import taskFilterActions from '../../actions/taskFilter'

class TaskFilter extends React.Component {

    render() {
        const { changeFilter } = this.props.taskFilterActions
        return (
            <div className="task-filter">
                <ul>
                    <li onClick={() => changeFilter('ALL')}><img src="./images/task.svg" alt="tasks" />Kaikki</li>
                    <li onClick={() => changeFilter('OWN')}><img src="./images/owntask.svg" alt="owntasks" />Omat</li>
                </ul>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        taskFilterActions: bindActionCreators(taskFilterActions, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(TaskFilter)