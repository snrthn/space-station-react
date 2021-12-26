import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class List extends Component {

    constructor (props) {
        super(props);

        this.state = {}
    }

    render () {
        return (
            <div className="app-list">
                
                历史计划
                
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

export default connect(mapStateToProps, mapDispatchToActions)(withRouter(List));