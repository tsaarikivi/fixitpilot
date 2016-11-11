import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import firebase from 'firebase'

import './topbar.scss'

class TopBar extends React.Component {
    render() {
        return (
            <nav className="top-bar">
                <ul>
                    <li className="left bold title"><Link to="/tasks"><img src="./images/task-light.svg" alt="tasklist" />FixitPilot</Link></li>
                    {this.renderAuth()}
                </ul>
            </nav>
        )
    }

    renderAuth() {
        // check user validation
        if (!this.props.auth) {
            return <div>
                <li className="right"><Link to="/login">Kirjaudu</Link></li>
                <li className="right"><Link to="/register">Rekisteröidy</Link></li>
            </div>
        }
        return <div><li className="right" onClick={() => this.logout()}><Link to="/tasks">Kirjaudu Ulos</Link></li></div>
    }

    logout() {
        firebase.auth().signOut()
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, null)(TopBar)