import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { Form, TextArea, Button, Switch, Space } from 'antd-mobile';

import { getUpdateTipsHandle } from 'store/actionCreators';

import setupLess from 'styles/setup.less';

class Setup extends Component {

    constructor (props) {
        super(props);

        this.state = {}
    }

    render () {
        let { loading } = this.state;
        let { showTips, tipsContent } = this.props;

        return (
            <div className={setupLess['app-setup']}>

                <TextArea
                    value={ tipsContent }
                    placeholder='请输入提示内容'
                    autoSize={{ minRows: 3, maxRows: 5 }}
                    onChange={(val) => { this.changeText(val) }}
                />

                <Space>
                    <span className={setupLess['label']}>是否显示：</span><Switch checked={ showTips } onChange={(val) => { this.changeShow(val) }} />
                </Space>
                
            </div>
        )
    }

    changeText = (val) => {
        this.props.updateTips({
            tipsContent: val
        });
    }

    changeShow = (val) => {
        this.props.updateTips({
            showTips: val
        });
    }
}

function mapStateToProps (state) {
    return {
        showTips: state.showTips,
        tipsContent: state.tipsContent
    };
}

function mapDispatchToActions (dispatch) {
    return {
        updateTips (options) {
            dispatch(getUpdateTipsHandle(options))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToActions)(withRouter(Setup));