import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addEvent } from 'utils/tools';

import Home from './pages/Home';
import Task from './pages/Task';
import List from './pages/List';
import Mine from './pages/Mine';
import Setup from './pages/Setup';

import { NavBar, TabBar } from 'antd-mobile';

import { Route, Switch, HashRouter as Router } from 'react-router-dom';

import { AppOutline, EditSOutline, UnorderedListOutline, UserOutline } from 'antd-mobile-icons';

import styles from 'styles/index.less';


class Index extends Component {

    constructor (props) {
        super(props);

        this.state = {
            router: [
                {
                    path: '/home',
                    title: '应用首页'
                },
                {
                    path: '/task',
                    title: '计划制定'
                },
                {
                    path: '/list',
                    title: '历史计划'
                },
                {
                    path: '/mine',
                    title: '个人中心'
                },
                {
                    path: '/setup',
                    title: '设置'
                }
            ],
            tabs: [
                {
                    key: '/home',
                    title: '应用首页',
                    icon: <AppOutline />
                },
                {
                    key: '/task',
                    title: '计划制定',
                    icon: <EditSOutline />
                },
                {
                    key: '/list',
                    title: '历史计划',
                    icon: <UnorderedListOutline />
                },
                {
                    key: '/mine',
                    title: '个人中心',
                    icon: <UserOutline />
                }
            ],
            activeTitle: '',
            activeKey: window.location.hash.split('#')[1]
        }
    }

    componentDidMount = () => {
        this.watchHashRouterChange(); // 监听路由变化

        let curPath = window.location.hash.split('#')[1];
        this.setRouteActive(curPath, true);
    }

    setRouteActive = (path, refresh) => {
        let curTitle = '';
        this.state.router.map(item => {
            if (item.path === path) {
                curTitle = item.title;
            }
        })

        if (!curTitle) curTitle = this.state.router[0].title;

        this.setState({
            activeKey: path === '/' ? '/home' : path,
            activeTitle: curTitle
        }, () => {
            if (!refresh) window.location.hash = '#' + path;
        })
    }

    goBackHandle () {
        window.history.go(-1);
    }

    watchHashRouterChange () {
        addEvent(window, 'hashchange', () => {
            let path = window.location.hash.split('#')[1];
            let curTitle = '';
            this.state.router.map(item => {
                if (item.path === path) {
                    curTitle = item.title;
                }
            })

            this.setState({
                activeKey: path,
                activeTitle: curTitle
            })
        })
    }

    render () {

        let { tabs, activeKey, activeTitle } = this.state;

        return (
            <div className="app-home">

                <Router>
                    <div className={styles.app}>
                        <div className={styles.top}>
                            <NavBar onBack={()=>{this.goBackHandle()}}>{activeTitle || '页面不存在'}</NavBar>
                        </div>
                        <div className={styles.body}>
                            <Switch>
                                <Route exact path='/'>
                                    <Home />
                                </Route>
                                <Route exact path='/home'>
                                    <Home />
                                </Route>
                                <Route exact path='/task'>
                                    <Task />
                                </Route>
                                <Route exact path='/list'>
                                    <List />
                                </Route>
                                <Route exact path='/mine'>
                                    <Mine />
                                </Route>
                                <Route exact path='/setup'>
                                    <Setup />
                                </Route>
                            </Switch>
                        </div>
                        <div className={styles.bottom}>
                            <TabBar activeKey={activeKey} safeArea={true} onChange={value => this.setRouteActive(value)}>
                                {tabs.map(item => (
                                    <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
                                ))}
                            </TabBar>
                        </div>
                    </div>
                </Router>
                
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

export default connect(mapStateToProps, mapDispatchToActions)(Index);