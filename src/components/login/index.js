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
                <label htmlFor="email">Email</label>
                <br />
                <Field name="email" component="input" type="email" />
                <br />
                <label htmlFor="password">Email</label>
                <br />
                <Field name="password" component="input" type="password" />
                <br />
                <button type="submit">Kirjaudu</button>
            </form>
        )
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

export default reduxForm({
    form: 'LoginForm'
})(Login)