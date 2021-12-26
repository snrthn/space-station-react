import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { NoticeBar, Swiper, Image, Space, ErrorBlock } from 'antd-mobile';

class Home extends Component {

    constructor (props) {
        super(props);

        this.state = {}
    }

    render () {

        let { showTips, tipsContent } = this.props;

        return (
            <div className="app-home">

                { showTips && <NoticeBar content={tipsContent} color='alert' /> }
                
                <Swiper autoplay>
                    <Swiper.Item key="1">
                        <Image src={require('assets/images/banner-01.jpg')} fit='fill' />
                    </Swiper.Item>
                    <Swiper.Item key="2">
                        <Image src={require('assets/images/banner-02.jpg')} fit='fill' />
                    </Swiper.Item>
                    <Swiper.Item key="3">
                        <Image src={require('assets/images/banner-03.jpg')} fit='fill' />
                    </Swiper.Item>
                    <Swiper.Item key="4">
                        <Image src={require('assets/images/banner-04.jpg')} fit='fill' />
                    </Swiper.Item>
                </Swiper>

                <Space block direction='vertical'>
                    <ErrorBlock status='empty' title="正在开发中" description="先看看其他吧" />
                </Space>
                
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        showTips: state.showTips,
        tipsContent: state.tipsContent
    };
}

function mapDispatchToActions () {
    return {};
}

export default connect(mapStateToProps, mapDispatchToActions)(withRouter(Home));