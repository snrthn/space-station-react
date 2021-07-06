import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RechargeAdd } from '../store/actionCreators';

class Recharge extends Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <div>
                <h1>充值控件</h1>
                <input ref="amtVal" type="number" placeholder="请输入金额" />
                <input type="button" value="充值" onClick={ this.props.RechargeAdd.bind(this) } />
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {};
}

function mapDispatchToActions (dispatch) {
    return {
        RechargeAdd () {
            let action = RechargeAdd(this.refs.amtVal.value * 1, this.refs.amtVal);
            dispatch(action);
        }
    };
}

export default connect(mapStateToProps, mapDispatchToActions)(Recharge);