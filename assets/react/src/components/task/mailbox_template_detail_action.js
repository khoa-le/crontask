import React, { Component } from 'react';

export default class MailBoxTemplateDetailAction extends Component {
    /** @namespace this.props.handleBack */
    constructor(props) {
        super(props);
        this.onDeleteTemplate = this.onDeleteTemplate.bind(this);
    }

    onOpenReplyForm() {
        $('.buttons').toggle();
        $('.email-reply').slideToggle(function () {
            goToPosition('.email-reply');
        });
        $('.summernote').summernote({
            focus: true,
            height: 240,
            toolbar: [
                ['style', ['bold', 'italic', 'underline']],
                ['para', ['ul', 'ol', 'paragraph']]
            ]
        });
    }

    onDeleteTemplate(e) {
        e.preventDefault();
        swal({
            title: this.context.t.popup.delete_template.confirm_title,
            text: this.context.t.popup.delete_template.confirm_text,
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: this.context.t.popup.ok,
            cancelButtonText:this.context.t.popup.cancel,
            closeOnConfirm: false
        }, function () {
            $.ajax({
                url: this.props.actionUrl.deleteTemplate,
                data: {id: this.props.data.id},
                dataType: 'json',
                method: 'POST',
                success: function (data) {
                    if (data.status == 'SUCCESS') {
                        swal({
                            title: this.context.t.popup.delete_template.title,
                            text: this.context.t.popup.delete_template.text,
                            type: 'success',
                            showCancelButton: false,
                            confirmButtonText: 'OK',
                            closeOnConfirm: true
                        }, function () {
                            this.props.handleBack();
                        }.bind(this));
                    }
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(this.props.actionUrl.deleteTemplate, status, err.toString());
                }.bind(this)
            });
        }.bind(this));
    }

    render() {
        let t = this.context.t;

        return (
            <div className="tooltip-demo buttons text-right">
                { (this.props.data.type == 1 ?
                        <div className="btn-group">
                            <a onClick={this.props.handleCopyTemplate.bind(this,this.props.data)}
                               className="btn btn-white btn-sm btn-copy" data-toggle="tooltip" data-placement="top"
                               title="" data-original-title="Copy this template">
                                <i className="fa fa-copy"></i> {t.copy}
                            </a>
                        </div>
                        :
                        <div className="btn-group">
                            <a onClick={this.props.handleEditTemplate.bind(this,this.props.data)}
                               className="btn btn-white btn-sm btn-edit" data-toggle="tooltip" data-placement="top"
                               title="" data-original-title="Edit this template">
                                <i className="fa fa-pencil"></i> {t.edit}
                            </a>
                            <a onClick={this.props.handleCopyTemplate.bind(this,this.props.data)}
                               className="btn btn-white btn-sm btn-copy" data-toggle="tooltip" data-placement="top"
                               title="" data-original-title="Copy this template">
                                <i className="fa fa-copy"></i> {t.copy}
                            </a>
                            <a onClick={this.onDeleteTemplate} className="btn btn-white btn-sm btn-delete"
                               data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete forever">
                                <i className="fa fa-trash-o"></i> {t.delete}
                            </a>
                        </div>

                )}
            </div>
        );
    }

;
}
MailBoxTemplateDetailAction.contextTypes = {lang: React.PropTypes.number, t: React.PropTypes.any};
MailBoxTemplateDetailAction.propTypes = {
    handleEditTemplate: React.PropTypes.func
};