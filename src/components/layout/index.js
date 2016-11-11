import React from 'react'

import Auth from '../auth'
import TopBar from './TopBar'

export default class Layout extends React.Component {
    render() {
        return (
            <div>
                <Auth />
                <TopBar />
                <div className="body-container">
                    {this.props.children}
                </div>
            </div>
        )
    }
}
