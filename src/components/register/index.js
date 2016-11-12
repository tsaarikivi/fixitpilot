import React from 'react'
import { bindActionCreators } from 'redux'
import { Field, reduxForm } from 'redux-form'
import firebase from 'firebase'

class Register extends React.Component {

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
                <Field name="firstName" component={data => this.renderField(data)} type="text" label="Etunimi" />
                <Field name="lastName" component={data => this.renderField(data)} type="text" label="Sukunimi" />
                <Field name="city" component={data => this.renderField(data)} type="text" label="Kaupunki" />
                <Field name="phone" component={data => this.renderField(data)} type="text" label="Puhelinnumero" />
                <button type="submit">Rekisteröidy</button>
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
        firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
            .then(user => {
                data.password = null
                data.coordinator = false
                data.admin = false
                data.uid = user.uid
                firebase.database().ref('users').child(user.uid).update(data)
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
    if (!values.firstName) {
        errors.firstName = 'Vaadittu kenttä'
    }
    if (!values.lastName) {
        errors.lastName = 'Vaadittu kenttä'
    }
    if (!values.city) {
        errors.city = 'Vaadittu kenttä'
    }
    if (!values.phone) {
        errors.phone = 'Vaadittu kenttä'
    }
    return errors
}

export default reduxForm({
    form: 'RegisterForm',
    validate
})(Register)