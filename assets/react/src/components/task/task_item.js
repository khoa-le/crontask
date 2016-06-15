import React, { Component } from 'react';
import moment from 'moment';

export default class TaskItem extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        if(this.context.lang==1){
            moment.locale('vi');
        }else{
            moment.locale('en');
        }
        var classReadStatus=(this.props.data.is_viewed_by_receiver || this.props.type=='sent' )?'read':'unread';
        return (
            <tr className={classReadStatus}>
                <td></td>
                <td >
                    <a href="#" data-message-id={this.props.data.id} onClick={this.props.handleViewDetail.bind(this,this.props.data)}>
                        { this.props.data.name }</a>
                </td>
                <td >
                        { this.props.data.command }
                </td>
                <td >
                    { (this.props.data.periodicity == 'stop') ? <span className="label">{this.props.data.periodicity}</span> : <span className="badge badge-primary">{this.props.data.periodicity}</span>}

                </td>
                <td className="text-right mail-date">
                    { moment(this.props.data.created_at).fromNow() }
                </td>
            </tr>
        );


    };
}
TaskItem.contextTypes = { lang: React.PropTypes.number,t:React.PropTypes.any};
