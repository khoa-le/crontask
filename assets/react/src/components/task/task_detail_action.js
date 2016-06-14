import React, { Component } from 'react';

export default class TaskDetailAction extends Component {
    /** @namespace this.props.handleBack */
    constructor(props) {
        super(props);
        console.log(this.props.data);
    }

    render() {
        return (
            <div className="tooltip-demo buttons text-right">
                <div className="btn-group">

                    <a onClick={this.props.handleExecute} className="btn btn-default btn-sm btn-trash"
                       data-toggle="tooltip"
                       data-placement="top" title="Execute"><i className="fa fa-check"></i> Execute</a>

                    <a onClick={this.props.handleDelete} className="btn btn-default btn-sm btn-trash"
                       data-toggle="tooltip"
                       data-placement="top" title="Delete"><i className="fa fa-close"></i> Delete</a>

                </div>

            </div>
        );
    }

;
}
TaskDetailAction.contextTypes = {lang: React.PropTypes.number, t: React.PropTypes.any};
TaskDetailAction.propTypes = {
    data: React.PropTypes.object,
    handleDelete: React.PropTypes.func,
    handleExecute: React.PropTypes.func,
    handleBack: React.PropTypes.func
};