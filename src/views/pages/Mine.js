import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { List } from 'antd-mobile';

import { SetOutline } from 'antd-mobile-icons';

import appMine from 'styles/mine.less';

class Mine extends Component {

    constructor (props) {
        super(props);

        this.state = {}
    }
    
    toSettingPahe = () => {
        this.props.history.push('/setting');
    }

    render () {
        return (
            <div className={appMine['app-mine']}>
                
                <div className={appMine['main-info']}>我的个人信息</div>
                
                <List>
                    <List.Item prefix={<SetOutline />} onClick={() => { this.toSettingPahe() }}>
                        设置
                    </List.Item>
                </List>
                
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

export default connect(mapStateToProps, mapDispatchToActions)(withRouter(Mine));