import React from 'react'
import { bindActionCreators } from 'redux'
import { Field, reduxForm } from 'redux-form'
import firebase from 'firebase'

class Login extends React.Component {

    static get contextTypes() {
        return {
            router: React.PropTypes.object.isRequired,
        }
    }

    render() {
        const { handleSubmit } = this.props
        return (
            <form onSubmit={handleSubmit(data => this.handleSubmit(data))}>
                <Field name="email" component={data => this.renderField(data)} type="email" label="Email" />
                <Field name="password" component={data => this.renderField(data)} type="password" label="Salasana" />
                <button type="submit">Kirjaudu</button>
            </form>
        )
    }

    renderField({ input, label, type, meta: { asyncValidating, touched, error } }) {
        return <div>
            <label>{label}</label>{touched && error && <span className="text-red error">{error}</span>}
            <div className={asyncValidating ? 'async-validating' : ''}>
                <input {...input} type={type} placeholder={label} />
            </div>
        </div>
    }

    handleSubmit(data) {
        firebase.auth().signInWithEmailAndPassword(data.email, data.password)
            .then(user => {
                // set user data to reducer
                this.context.router.push('/tasks')
            })
            .catch(error => {
                console.error(error)
            })
    }
}

const validate = values => {
    const errors = {}
    if (!values.email) {
        errors.email = 'Vaadittu kenttä'
    }
    if (!values.password) {
        errors.password = 'Vaadittu kenttä'
    }
    return errors
}

export default reduxForm({
    form: 'LoginForm',
    validate
})(Login)