import React, { Component } from 'react';
import { connect } from 'react-redux';

import 'styles/dashboard.less';

class Dashboard extends Component {
    render () {
        return (
            <div className="app-dashboard">
                
                <div className="welcome-msg">欢迎使用…</div>
                
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {};
}

function mapDispatchToActions (dispatch) {
    return {};
}

export default connect(mapStateToProps, mapDispatchToActions)(Dashboard);