import React, { Component } from 'react';
import moment from 'moment';
import uuid from 'uuid';
import TaskDetailAction from './task_detail_action.js';

export default class TaskDetail extends Component {
    /** @namespace this.props.handleBack */
    constructor(props) {
        super(props);
        this.state = {
            task: {},
            job: {}
        }
        if(this.props.data.id){
            this.state.task=this.props.data;
        }else{
            this.state.task={id:uuid.v1()};
        }
        this.onSaveTask = this.onSaveTask.bind(this);
        this.onDeleteTask = this.onDeleteTask.bind(this);
        this.onStopTask = this.onStopTask.bind(this);

    }

    loadMessagesFromServer() {

    }

    componentDidMount() {

    }
    onSaveTask(e) {
        e.preventDefault();
        let data={
            id:this.state.task.id,
            command:$("input[name=command]").val(),
            periodicity:$("input[name=periodicity]").val()
        };
        $.ajax(
            {
                url: 'api/tasks',
                headers: {
                    'Content-Type':'application/json'
                },
                data: JSON.stringify(data),
                dataType: 'json',
                method: 'POST',
                success: function (data) {
                    if (data.status == 'SUCCESS') {
                        this.props.handleBack()
                    }
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(this.props.actionUrl.sendMessage, status, err.toString());
                }.bind(this)
            }
        )
    }
    onDeleteTask(e) {
        e.preventDefault();
        $.ajax(
            {
                url: 'api/tasks/'+this.state.task.id,
                type: 'DELETE',
                success: function (data) {
                    this.props.handleBack()

                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(this.props.actionUrl.sendMessage, status, err.toString());
                }.bind(this)
            }
        )
    }
    onStopTask(e){

    }

    render() {
        return (
            <div className="col-lg-12 animated fadeInRight">
                <div className="mail-box-header clearfix">
                    <div className="pull-left">
                        <a className="btn btn-white btn-sm" onClick={this.props.handleBack}><i
                            className="fa fa-long-arrow-left"></i> Back </a>
                    </div>
                    <div className="pull-right">
                        <TaskDetailAction
                            data={this.state.task}
                            handleDelete={this.onDeleteTask}
                            handleBack={this.props.handleBack}
                            />
                    </div>
                </div>
                <div className="mail-box">
                    <div className="mail-body">
                        <form id="formUpdate" className="form-horizontal" method="Post">
                            <div className="form-group">
                                <label className="col-sm-2 control-label">ID:</label>

                                <div className="col-sm-10">
                                    <input type="text" className="form-control" defaultValue={this.state.task.id} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">Command:</label>
                                <div className="col-sm-10">
                                    <input name="command" type="text" className="form-control" defaultValue={this.state.task.command} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">Periodicity:</label>
                                <div className="col-sm-10">
                                    <input name="periodicity" type="text" className="form-control" defaultValue={this.state.task.periodicity} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">Create:</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" defaultValue={this.state.task.created_at} />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-sm-10 col-md-offset-2">
                                <a onClick={this.onSaveTask} className="btn btn-primary">Save</a> &nbsp;
                                <button type="button" onClick={this.props.handleBack} className="btn btn-default">Cancel</button>
                            </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

;
}
TaskDetail.contextTypes = {lang: React.PropTypes.number, t: React.PropTypes.any};
TaskDetail.propTypes = {
    handleBack: React.PropTypes.func,
    data: React.PropTypes.object,
};