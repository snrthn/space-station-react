import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ConsumeBuy } from '../store/actionCreators';

class Consume extends Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <div>
                <h1>支付控件</h1>
                <input ref="amtVal" type="number" placeholder="请输入金额" />
                <input type="button" value="支付" onClick={ this.props.ConsumeBuy.bind(this) } />
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {};
}

function mapDispatchToActions (dispatch) {
    return {
        ConsumeBuy () {
            let action = ConsumeBuy(this.refs.amtVal.value * 1, this.refs.amtVal);
            dispatch(action);
        }
    };
}

export default connect(mapStateToProps, mapDispatchToActions)(Consume);