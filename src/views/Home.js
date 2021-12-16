import React, { Component } from 'react';
import { connect } from 'react-redux';

import { HashRouter, NavLink, Route, Switch } from 'react-router-dom';

import Dashboard from './dashboard';
import Addto from './addto';
import DataList from './datalist';

import 'styles/home.less';

import 'antd/dist/antd.css';

class Home extends Component {
    render () {
        return (
            <div className="app-home">

                <HashRouter>

                    <div className="app-home-header">
                        <NavLink className="nav-item" activeClassName="nav-active" to="/dashboard">Dashboard</NavLink>
                        <NavLink className="nav-item" activeClassName="nav-active" to="/addto">添加</NavLink>
                        <NavLink className="nav-item" activeClassName="nav-active" to="/datalist">列表</NavLink>
                    </div>
            
                    <div className="app-home-body">

                        <Switch>

                            <Route exact path="/">
                                <Dashboard />
                            </Route>

                            <Route path="/dashboard">
                                <Dashboard />
                            </Route>

                            <Route path="/addto" tag="yhn">
                                <Addto />
                            </Route>

                            <Route path="/datalist">
                                <DataList />
                            </Route>

                        </Switch>

                    </div>

                </HashRouter>
                
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