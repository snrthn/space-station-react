import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { Image } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

import './index.scss';

class ImgPreview extends Component {

    constructor (props) {
        super(props);
    }

    render () {

        let { src } = this.props;

        return (
            <div className="img-preview">

                <CloseOutlined className="close-icon" style={{ fontSize: '28px', color: '#ffffff' }} onClick={ () => { this.props.closeHandle() } } />
                
                <Image className="mask-image" preview={ false } src={ src } fallback={ require('assets/images/load-fail.png') } />

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

export default connect(mapStateToProps, mapDispatchToActions)(withRouter(ImgPreview));