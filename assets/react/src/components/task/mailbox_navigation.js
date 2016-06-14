/**
 * Created by khoalengoc on 12/25/15.
 */
import React, { Component } from 'react';


export default class MailBoxNavigation extends Component {
    constructor(props) {
        super(props);
    }
    render() {

        return (
            <div className="col-md-3 col-lg-2">
                <div className="ibox float-e-margins">
                    <div className="ibox-content mailbox-content">
                        <div className="file-manager">
                            <h5>{this.context.t.folders}</h5>
                            <ul className="folder-list">
                                <li className={this.props.active =='inbox'?'active':''}>
                                    <a onClick={this.props.handleClick.bind(this,'inbox')}>
                                        <i className="fa fa-inbox "></i> {this.context.t.inbox}
                                        <span className={this.props.totalInbox==0?'hidden':'label label-warning pull-right'}
                                            >{this.props.totalInbox}
                                        </span>
                                    </a>
                                </li>
                                <li className={this.props.active =='sent'?'active':''}>
                                    <a onClick={this.props.handleClick.bind(this,'sent')}> <i
                                        className="fa fa-envelope-o"></i> {this.context.t.sent}</a>
                                </li>
                                <li className={this.props.active =='trash'?'active':''}>
                                    <a onClick={this.props.handleClick.bind(this,'trash')}> <i
                                        className="fa fa-trash-o"></i> {this.context.t.trash}</a>
                                </li>
                                <div className="space-25"></div>
                                <li  className={this.props.active =='template'?'active':''}>
                                    <a onClick={this.props.handleClick.bind(this,'template')}> <i className="fa fa-list-alt"></i>
                                        {this.context.t.template}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
MailBoxNavigation.contextTypes = {lang: React.PropTypes.number, t: React.PropTypes.any};
