import React, { Component } from 'react';

import Tasks from './tasks';
import TaskDetail from './task_detail';

export default class TaskContainer extends Component {
    getChildContext() {
        return {
            lang: this.state.lang,
            t: this.state.t
        }
    }
    constructor(props) {
        super(props);

        this.state = {
            lang: window.lang,
            pagination_limit:5,
            viewMode: 'list',
            navRef: 'inbox',
            data: [],
            offset: 0,
            totalInbox: 0
        }
        if(window.viewDetailId>0){
            this.state.viewMode='detail';
            this.state.item=window.viewDetailData;
        }
    }
    loadCounterFromServer() {
        
    }

    componentDidMount() {
        this.loadCounterFromServer();
    }
    handleViewDetail = (data) => {
        this.setState({
            'viewMode': 'detail',
            'item': data
        },()=>{
            
        });
    }
    handleCreateNew = (data) => {
        this.setState({
            'viewMode': 'detail',
            'item': {}
        },()=>{

        });
    }
    handleBackToList = (data) => {
        this.setState({viewMode: 'list'});
    }
    render() {
        
        if (this.state.viewMode == 'detail') {
            return (
                <div className="row">

                                    <TaskDetail
                                        handleBack={this.handleBackToList}
                                        data={this.state.item}
                                        />

                </div>
            )
        }
        else{
            return (
                <div className="row " >
                    <div className="col-md-12 col-lg-12 animated fadeInRight">
                        <div id="messageInbox">
                            <div className="mail-box-header">
                                <div className="pull-right">
                                    <div className="tooltip-demo buttons text-right">
                                        <div className="btn-group">
                                            <a onClick={this.handleCreateNew} className="btn btn-white btn-sm btn-trash"
                                               data-toggle="tooltip"
                                               data-placement="top" title="Create new"><i className="fa fa-plus"></i> Create</a>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="mail-box">
                                <div className="mailbox">
                                    <Tasks
                                        handleViewDetail={this.handleViewDetail}
                                        perPage='5'
                                        url='api/tasks'
                                        />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
};

TaskContainer.childContextTypes = { lang: React.PropTypes.number,t:React.PropTypes.any};
