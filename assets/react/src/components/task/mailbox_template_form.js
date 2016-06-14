import React, { Component } from 'react';
import moment from 'moment';
import MailBoxTemplateDetailAction from './mailbox_template_detail_action.js';


export default class MailBoxTemplateForm extends Component {
    /** @namespace this.props.handleBack */
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            validator:null,

        };
        this.onCreateNewTemplate = this.onCreateNewTemplate.bind(this);
        this.onSaveTemplate = this.onSaveTemplate.bind(this);
        this.getFormSubmitValidator = this.getFormSubmitValidator.bind(this);
    }
    componentDidUpdate() {

    }
    componentDidMount() {
        this.template_name.focus();
        $(this.summernote).summernote({
            height: 240,
            toolbar: [
                ['style', ['bold', 'italic', 'underline']],
                ['para', ['ul', 'ol', 'paragraph']]
            ]
        });
        if (Object.keys(this.props.data).length > 0 && typeof this.props.data.content !== 'undefined') {
            var content = this.props.data.content.replace(/(?:\r\n|\r|\n)/g, '<br />');
            $(this.summernote).summernote('code', content);
        }
    }

    onCreateNewTemplate(e) {
        e.preventDefault();
        var options=this.getFormSubmitValidator();
        var validator = $("#frmMailboxTemplate").validate(options)
        validator.form();
        if (validator.valid()) {
            $(e.target).ajaxSubmit({
                url: this.props.actionUrl.saveTemplate,
                data: {'template[content]': $('.summernote').summernote('code')},
                dataType: 'json',
                method: 'POST',
                success: function (data) {
                    if (data.status == 'SUCCESS') {
                        swal({
                            title: this.context.t.popup.create_template.title,
                            text: this.context.t.popup.create_template.text,
                            type: 'success',
                            showCancelButton: false,
                            confirmButtonText: 'OK',
                            timer: 1500,
                            showConfirmButton: false
                        }, function () {
                            swal.close();
                            this.props.handleBack();
                        }.bind(this));
                    }
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(this.props.actionUrl.saveTemplate, status, err.toString());
                }.bind(this)
            });
        }
    }

    onSaveTemplate(e) {
        e.preventDefault();
        var options=this.getFormSubmitValidator();
        var validator = $("#frmMailboxTemplate").validate(options)
        validator.form();
        if (validator.valid()) {
            $(e.target).ajaxSubmit({
                url: this.props.actionUrl.saveTemplate,
                data: {'template[content]': $('.summernote').summernote('code')},
                dataType: 'json',
                method: 'POST',
                success: function (data) {
                    if (data.status == 'SUCCESS') {
                        swal({
                            title: this.context.t.popup.save_template.title,
                            text: this.context.t.popup.save_template.text,
                            type: 'success',
                            showCancelButton: false,
                            confirmButtonText: 'OK',
                            timer: 1500,
                            showConfirmButton: false
                        }, function () {
                            swal.close();
                            this.props.handleBack();
                        }.bind(this));
                    }
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(this.props.actionUrl.saveTemplate, status, err.toString());
                }.bind(this)
            });
        }
    }

    render() {
        let t = this.context.t;
        var data = this.props.data || {};

        var handleOnSubmit = this.onSaveTemplate;
        if (this.props.actionType == 'copy' || this.props.actionType == 'create') {
            data.id = '';
            handleOnSubmit = this.onCreateNewTemplate;
        }
        console.log(this.props.actionType);

        return (
            <div>
                <div className="mail-box-header">
                    <div className="pull-left">
                        <a className="btn btn-white btn-sm" onClick={this.props.handleBack}><i
                            className="fa fa-long-arrow-left"></i> {t.back} </a>
                    </div>
                    <br/>
                    <br/>

                    <h2>
                        { data.id == '' ? t.create_new_template : t.update_template}
                    </h2>
                </div>
                <div className="mail-box">
                    <form id="frmMailboxTemplate" onSubmit={ handleOnSubmit }
                          className="form-horizontal" method="post">
                        <div className="mail-body">
                            <div className="form-group">
                                <label className="col-sm-2 control-label">{t.header.template_name}:</label>

                                <div className="col-sm-10">
                                    <input
                                        name="template[title]"
                                        type="text"
                                        className="form-control"
                                        ref={(c) => this.template_name = c} placeholder={t.placeholder.template_name}
                                        defaultValue={data.title}
                                        />
                                    <input name="template[id]" type="hidden" value={data.id}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">{t.header.subject}:</label>

                                <div className="col-sm-10">
                                    <input
                                        name="template[subject]"
                                        type="text"
                                        className="form-control"
                                        placeholder={t.placeholder.subject}
                                        defaultValue={data.subject}
                                        />
                                </div>
                            </div>
                        </div>
                        <div className="mail-text">
                            <div className="summernote" id="contentNewTemplate" ref={(c) => this.summernote = c}>

                            </div>
                            <div className="clearfix"></div>
                        </div>
                        <div className="mail-body text-right tooltip-demo action-buttons">
                            <button type="submit" className="btn btn-primary btn-save" data-toggle="tooltip"
                                    data-placement="top"
                                    title="Save this template"><i className="fa fa-fw fa-save"></i> {t.save}

                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    getFormSubmitValidator() {
        var t=this.context.t;
        return {
            errorClass: 'error',
            submit: false,
            focusInvalid: true,
            ignore: [],
            errorLabelContainer: '',
            rules: {
                'template[title]': {
                    required: true
                },
                'template[subject]':{
                    required: true
                }
            },
            messages: {
                'template[title]': {
                    required: t.form.createTemplate.title.NotBlank
                },
                'template[subject]': {
                    required: t.form.createTemplate.subject.NotBlank
                }
            }
        };
    }
};
MailBoxTemplateForm.contextTypes = {lang: React.PropTypes.number, t: React.PropTypes.any};
