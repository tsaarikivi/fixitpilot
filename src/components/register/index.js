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
                <label htmlFor="email">Email</label>
                <br />
                <Field name="email" component="input" type="email" />
                <br />
                <label htmlFor="password">Salasana</label>
                <br />
                <Field name="password" component="input" type="password" />
                <br />
                <label htmlFor="firstName">Etunimi</label>
                <br />
                <Field name="firstName" component="input" type="text" />
                <br />
                <label htmlFor="lastName">Sukunimi</label>
                <br />
                <Field name="lastName" component="input" type="text" />
                <br />
                <label htmlFor="city">Kaupunki</label>
                <br />
                <Field name="city" component="input" type="text" />
                <br />
                <button type="submit">Rekisteröidy</button>
            </form>
        )
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

export default reduxForm({
    form: 'RegisterForm'
})(Register)