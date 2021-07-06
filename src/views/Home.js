import React, { Component } from 'react';
import { connect } from 'react-redux';
import Balance from './Balance';
import Recharge from './Recharge';
import Consume from './Consume';
import 'styles/home.less';

class Home extends Component {
    render () {
        return (
            <div className="app-home">
                <Balance />
                <Recharge />
                <Consume />
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

export default connect(mapStateToProps, mapDispatchToActions)(Home);