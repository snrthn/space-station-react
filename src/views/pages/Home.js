import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { NoticeBar, Swiper, Image, Space, ErrorBlock } from 'antd-mobile';

import MyDiary from 'components/myDiary/myDiary';

class Home extends Component {

    constructor (props) {
        super(props);

        this.state = {
            tipsContent: this.props.tipsContent,
            showTips: this.props.showTips
        }
    }

    render () {

        let { showTips, tipsContent } = this.props;

        return (
            <div className="app-home">

                { showTips && <NoticeBar content={tipsContent} color='alert' /> }
                
                <Swiper autoplay>
                    <Swiper.Item key="1" style={{ textAlign: 'center', background: '#f8f8f8' }}>
                        <Image src={require('assets/images/banner-01.jpg')} fit='scale-down' />
                    </Swiper.Item>
                    <Swiper.Item key="2" style={{ textAlign: 'center', background: '#f8f8f8' }}>
                        <Image src={require('assets/images/banner-02.jpg')} fit='scale-down' />
                    </Swiper.Item>
                    <Swiper.Item key="3" style={{ textAlign: 'center', background: '#f8f8f8' }}>
                        <Image src={require('assets/images/banner-03.jpg')} fit='scale-down' />
                    </Swiper.Item>
                    <Swiper.Item key="4" style={{ textAlign: 'center', background: '#f8f8f8' }}>
                        <Image src={require('assets/images/banner-04.jpg')} fit='scale-down' />
                    </Swiper.Item>
                </Swiper>

                {/* <Space block direction='vertical'>
                    <ErrorBlock status='empty' title="正在开发中" description="先看看其他吧" />
                </Space> */}

                <MyDiary/>
                
            </div>
        )
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
    return {};
}

export default connect(mapStateToProps, mapDispatchToActions)(withRouter(Home));