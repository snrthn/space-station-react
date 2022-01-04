import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addEvent } from 'utils/tools';

import Home from './pages/Home';
import Task from './pages/Task';
import List from './pages/List';
import Mine from './pages/Mine';
import Setting from './pages/Setting';

import { getTipsContentHandle } from 'store/actionCreators';

import { NavBar, TabBar } from 'antd-mobile';

import { Route, Switch, HashRouter as Router } from 'react-router-dom';

import { AppOutline, EditSOutline, UnorderedListOutline, UserOutline } from 'antd-mobile-icons';

import styles from 'styles/index.less';

class Index extends Component {

    constructor (props) {
        super(props);

        this.props.queryTips();

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
                    path: '/setting',
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
            activeKey: window.location.hash.split('#')[1],
            mainBody: null
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

        this.setState({
            mainBody: document.getElementById('mainContent')
        })

        addEvent(window, 'hashchange', () => {
            let { mainBody } = this.state;
            let path = window.location.hash.split('#')[1];
            let curTitle = '';
            this.state.router.map(item => {
                if (item.path === path) {
                    curTitle = item.title;
                }
            })

            // 跳转路由，滚动条置顶
            if (mainBody.scrollTop) mainBody.scrollTop = 0;

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
                        <div className={styles.body} id="mainContent">
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
                                <Route exact path='/setting'>
                                    <Setting />
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

function mapDispatchToActions (dispatch) {
    return {
        queryTips () {
            dispatch(getTipsContentHandle());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToActions)(Index);