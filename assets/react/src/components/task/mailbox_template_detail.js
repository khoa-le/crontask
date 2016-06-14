import React, { Component } from 'react';
import moment from 'moment';
import MailBoxDetailPlaceHolder from './mailbox_detail_placeholder.js';
import MailBoxTemplateDetailAction from './mailbox_template_detail_action.js';

export default class MailBoxTemplateDetail extends Component {
    /** @namespace this.props.handleBack */
    constructor(props) {
        super(props);
        this.state = {
            candidateUrl: '',
            message: {}
        }
    }

    render() {
        let t = this.context.t;
        return (
            <div>
                <div className="mail-box-header">
                    <div className="pull-left">
                        <a className="btn btn-white btn-sm" onClick={this.props.handleBack}><i
                            className="fa fa-long-arrow-left"></i> {t.back} </a>
                    </div>
                    <div className="pull-right">
                        <MailBoxTemplateDetailAction
                            actionUrl={this.props.actionUrl}
                            data={this.props.data}
                            handleBack={this.props.handleBack}
                            handleEditTemplate={this.props.handleEditTemplate}
                            handleCopyTemplate={this.props.handleCopyTemplate}
                            />
                    </div>
                    <br/>
                    <br/>
                    {this.props.data.type == 0 ?
                        <div className="mail-tools tooltip-demo">
                            <h5>
                                <span className="font-normal gray-light"><em>{t.header.template_name}: <strong>{this.props.data.title}</strong> - {t.header.modified_date}: <strong>{moment(this.props.data.updated_date).format('LL')}</strong></em></span>
                            </h5>
                        </div>
                        : null }
                    <br/>
                    <h2 className="m-b-n-sm">
                        {this.props.data.subject}
                        &nbsp;{this.props.data.type == 1 ? <span className="label label-info">VNW</span> : null}
                    </h2>
                </div>
                <div className="mail-box">
                    <div className="mail-body"
                         dangerouslySetInnerHTML={{__html: this.props.data.content.replace(/(?:\r\n|\r|\n)/g, '<br />')}}>
                    </div>
                    <div className="mail-body buttons">
                        <MailBoxTemplateDetailAction
                            actionUrl={this.props.actionUrl}
                            data={this.props.data}
                            handleBack={this.props.handleBack}
                            handleEditTemplate={this.props.handleEditTemplate}
                            handleCopyTemplate={this.props.handleCopyTemplate}
                            />
                    </div>
                </div>
            </div>
        );
    }

;
}
MailBoxTemplateDetail.contextTypes = {lang: React.PropTypes.number, t: React.PropTypes.any};
MailBoxTemplateDetail.propTypes = {
    handleBack: React.PropTypes.func,
    handleEditTemplate: React.PropTypes.func,
    actionUrl: React.PropTypes.object,
    data: React.PropTypes.object,
    candidate: React.PropTypes.object,
    messageType: React.PropTypes.string //sent, inbox, trash
};