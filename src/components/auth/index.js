import React from 'react'
import firebase from 'firebase'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as authActionCreators from '../../actions/auth'

class Auth extends React.Component {
    componentDidMount() {
        // set firebase auth eventlistener
        const { login } = this.props.authActions
        const { logout } = this.props.authActions
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                console.log("logged in as:", user)
                login(user)
            } else {
                console.log("logged out")
                logout()
            }
        })
    }

    render() {
        return <div></div>
    }
}

function mapDispatchToProps(dispatch) {
    return { authActions: bindActionCreators(authActionCreators, dispatch) }
}

export default connect(null, mapDispatchToProps)(Auth)