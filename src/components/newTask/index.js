import React from 'react'
import { bindActionCreators } from 'redux'
import { Field, reduxForm } from 'redux-form'
import firebase from 'firebase'
import { connect } from 'react-redux'

import { Router } from 'react-router';

class Register extends React.Component {

    static get contextTypes() {
        return {
            router: React.PropTypes.object.isRequired,
        }
    }

    render() {
        const { auth } = this.props
        if (auth) {
            if (auth.coordinator) {
                const { handleSubmit } = this.props
                return (
                    <form onSubmit={handleSubmit(data => this.handleSubmit(data))}>
                        <label htmlFor="title">Otsikko</label>
                        <br />
                        <Field name="title" component="input" type="text" />
                        <br />
                        <label htmlFor="desc">Kuvaus</label>
                        <br />
                        <Field name="desc" component="textarea" type="text" />
                        <br />
                        <label htmlFor="address">Osoite</label>
                        <br />
                        <Field name="address" component="input" type="text" />
                        <br />
                        <button type="submit">Luo</button>
                    </form>
                )
            }
        }
        return <h2>Et voi luoda uusia duuneja ilman koordinointioikeuksia</h2>
    }

    handleSubmit(data) {
        data.done = false
        data.assignee = false
        data.continued = 0
        firebase.database().ref('tasks').push(data)
        this.context.router.push('/tasks')
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

const NewTaskForm = reduxForm({
    form: 'NewTaskForm'
})(Register)

const NewTaskFormConnect = connect(
    state => ({
        auth: state.auth
    }),
    null
)(NewTaskForm)

export default NewTaskFormConnect
