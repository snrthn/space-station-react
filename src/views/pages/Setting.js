import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { Form, TextArea, Button, Switch, Space } from 'antd-mobile';

import { getTipsContentHandle, updateTipsHandle } from 'store/actionCreators';

import settingStyle from 'styles/setting.less';

import store from 'store';

class Setting extends Component {

    constructor (props) {
        super(props);

        this.state = {
            tipsContent: this.props.tipsContent,
            showTips: this.props.showTips,
            loading: false
        }

        // 监听store数据变化
        store.subscribe(() => {
            if (this.state.loading) return;
            setTimeout(() => {
                this.setState({
                    tipsContent: this.props.tipsContent,
                    showTips: this.props.showTips
                })
            }, 0);
        });
    }

    render () {
        let { showTips, tipsContent, loading } = this.state;

        return (
            <div className={settingStyle['app-setting']}>

                <TextArea
                    value={ tipsContent }
                    className={ settingStyle['text-area'] }
                    placeholder='请输入提示内容'
                    autoSize={{ minRows: 3, maxRows: 5 }}
                    onChange={(val) => { this.changeFormHandle('tipsContent', val) }}
                />

                <Space>
                    <span className={settingStyle['label']}>是否显示：</span><Switch checked={ showTips } onChange={(val) => { this.changeFormHandle('showTips', val) }} />
                </Space>


                <Button style={{ margin: '16px 0px' }} color='primary' block loading={loading} loadingText="更新中" onClick={()=>{ this.submitData() }}>
                    保存
                </Button>
                
            </div>
        )
    }

    changeFormHandle = (key, val) => {
        this.setState({ [key]: val });
    }

    submitData = () => {
        this.setState({
            loading: true
        }, () => {
            this.props.updateTips({
                vm: this,
                message: this.state.tipsContent,
                show: this.state.showTips ? 1 : 0
            })
        })
    }

    componentWillUnmount () {
        this.setState = () => false;
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
        queryTips () {
            dispatch(getTipsContentHandle());
        },
        updateTips (options) {
            dispatch(updateTipsHandle(options));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToActions)(withRouter(Setting));