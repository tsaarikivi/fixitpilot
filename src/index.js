import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { Router, hashHistory } from 'react-router'

import routes from './routes'
import store from './store'

require('./styles/index.scss')
require('./styles/form.scss')
require('./styles/list.scss')

// create redux store and apply middleware
let reduxStore = createStore(store, applyMiddleware(thunk))

// initialize firebase
import firebase from 'firebase'
/*STAGE CONFIG*/
const fbconfig = {
    apiKey: "AIzaSyAUpkX_la0XqFpon3Zidswuxgur8Z_2MAw",
    authDomain: "fixit-stage.firebaseapp.com",
    databaseURL: "https://fixit-stage.firebaseio.com",
    storageBucket: "fixit-stage.appspot.com",
    messagingSenderId: "990552496788"
}
/*PRODUCTION CONFIG
const fbconfig = {
}*/
firebase.initializeApp(fbconfig)

// render applications in place of #app-entry in index.html
ReactDOM.render(
    <Provider store={reduxStore}>
        <Router history={hashHistory} routes={routes} />
    </Provider>,
    document.getElementById('app-entry')
)