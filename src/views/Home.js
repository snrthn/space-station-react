import React, { Component } from 'react';
import { connect } from 'react-redux';

import { HashRouter, NavLink, Route, Switch } from 'react-router-dom';

import 'styles/home.less';

import 'antd/dist/antd.css';

class Home extends Component {
    render () {
        return (
            <div className="app-home">

                锻炼系统初始化
                
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {};
}

function mapDispatchToActions () {
    return {};
}

export default connect(mapStateToProps, mapDispatchToActions)(Home);