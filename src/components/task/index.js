import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import taskActions from '../../actions/task'
import firebase from 'firebase'

require('./task.scss')

class Task extends React.Component {
    componentDidMount() {
        const taskId = this.props.location.pathname.split("/")[2]
        this.props.taskActions.fetchTask(taskId)
    }

    componentWillUnmount() {
        const taskId = this.props.location.pathname.split("/")[2]
        firebase.database().ref('tasks').child(taskId).off()
    }

    render() {
        const { task } = this.props
        if (task) {
            return (
                <div className="task-view">
                    <h1>{task.title}</h1>
                    <p>Osoite: {task.address}</p>
                    <p>Kuvaus: {task.desc}</p>
                    <p>Toivottu käyntiaika: {task.reqtime}</p>
                    <p>tehty: {task.done.toString()}</p>
                    <p>jatkettu: {task.continued}</p>
                    {this.renderButtons(task)}
                    {this.renderDoing(task)}
                </div>
            )
        }
        return <div></div>
    }

    renderButtons(task) {
        const { auth } = this.props
        const taskId = this.props.location.pathname.split("/")[2]
        if (!auth) return <h3>Kirjaudu ottaaksesi duuni vastaan</h3>
        if (task.done) return <h3>Työ on jo valmis</h3>
        if (!task.assignee) {
            return (
                <button onClick={() => this.acceptTask(task, taskId)}>Ota duuni vastaan</button>
            )
        }
        if (task.assignee == auth.uid) {
            return <div>
                <button onClick={() => this.cancelTask(task, taskId)}>Peruuta duuni</button>
                <button onClick={() => this.continueTask(task, taskId)}>Jatka duunia myöhemmin</button>
                <button onClick={() => this.completeTask(task, taskId)}>Duuni valmis</button>
            </div>
        }
    }

    renderDoing(task) {
        if (task.assignee) return <h2>Duuni on otettu vastaan</h2>
    }

    acceptTask(task, taskId) {
        firebase.database().ref('tasks').child(taskId).update({
            assignee: this.props.auth.uid
        })
    }

    cancelTask(task, taskId) {
        firebase.database().ref('tasks').child(taskId).update({
            assignee: false
        })
    }

    continueTask(task, taskId) {
        firebase.database().ref('tasks').child(taskId).update({
            continued: task.continued + 1
        })
    }

    completeTask(task, taskId) {
        firebase.database().ref('tasks').child(taskId).update({
            done: true
        })
    }
}

function mapStateToProps(state) {
    return { task: state.task, auth: state.auth }
}

function mapDispatchToProps(dispatch) {
    return {
        taskActions: bindActionCreators(taskActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Task)