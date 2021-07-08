import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBalance } from '../store/actionCreators';

class Balance extends Component {
    constructor (props) {
        super(props);
    }

    componentDidMount () {
        this.props.getBalance();
    }

    render () {
        return (
            <div>
                <h1>余额看板</h1>
                <h2>当前余额：{ this.props.balance.toFixed(2) } 元</h2>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        balance: state.balance
    };
}

function mapDispatchToActions (dispatch) {
    return {
        getBalance () {
            let action = getBalance();
            dispatch(action);
        }
    };
}

export default connect(mapStateToProps, mapDispatchToActions)(Balance);