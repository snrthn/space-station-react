import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class Task extends Component {

    constructor (props) {
        super(props);

        this.state = {}
    }

    render () {
        return (
            <div className="app-task">
                
                计划制定
                
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

export default connect(mapStateToProps, mapDispatchToActions)(withRouter(Task));