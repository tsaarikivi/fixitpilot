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
                        <Field name="title" component={data => this.renderField(data)} type="text" label="Otsikko" />
                        <Field name="desc" component={data => this.renderField(data)} type="text" textarea label="Kuvaus" />
                        <Field name="address" component={data => this.renderField(data)} type="text" label="Osoite" />
                        <Field name="reqtime" component={data => this.renderField(data)} type="text" label="Toivottu käyntiaika" />
                        <button type="submit">Luo</button>
                    </form>
                )
            }
        }
        return <h2>Et voi luoda uusia duuneja ilman koordinointioikeuksia</h2>
    }

    renderField({ textarea, input, label, type, meta: { asyncValidating, touched, error } }) {
        let inp = <input {...input} type={type} placeholder={label} />
        if (textarea) inp = <textarea {...input} type={type} placeholder={label} />
        return <div>
            <label>{label}</label>{touched && error && <span className="text-red error">{error}</span>}
            <div className={asyncValidating ? 'async-validating' : ''}>
                {inp}
            </div>
        </div>
    }

    handleSubmit(data) {
        data.done = false
        data.assignee = false
        data.continued = 0
        data.timestamp = new Date().getTime()
        firebase.database().ref('tasks').push(data)
        this.context.router.push('/tasks')
    }
}

const validate = values => {
    const errors = {}
    if (!values.title) {
        errors.title = 'Vaadittu kenttä'
    }
    if (!values.desc) {
        errors.desc = 'Vaadittu kenttä'
    }
    if (!values.address) {
        errors.address = 'Vaadittu kenttä'
    }
    if (!values.reqtime) {
        errors.reqtime = 'Vaadittu kenttä'
    }
    return errors
}

const NewTaskForm = reduxForm({
    form: 'NewTaskForm',
    validate
})(Register)

const NewTaskFormConnect = connect(
    state => ({
        auth: state.auth
    }),
    null
)(NewTaskForm)

export default NewTaskFormConnect
