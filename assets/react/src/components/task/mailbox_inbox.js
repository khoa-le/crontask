import React, { Component } from 'react';
import MailBoxItem from './task_item.js';
import ReactPaginate from 'react-paginate';


export default class MailBoxInbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            offset: 0,
            loading:false
        }
    }

    loadMessagesFromServer() {
        $.ajax({
            url: this.props.url,
            data: {limit: this.props.perPage, offset: this.state.offset},
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({
                    data: data,
                    pageNum: Math.ceil(data.total / this.props.perPage),
                    loading:true
                });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    componentDidMount() {
        this.loadMessagesFromServer();
    }

    handlePageClick = (data) => {
        let selected = data.selected;
        let offset = Math.ceil(selected * this.props.perPage);
        this.setState({offset: offset}, () => {
            this.loadMessagesFromServer();
        });
    };

    render() {
        var messages = [];
        var t = this.context.t;
        if (this.state.data.total > 0) {
            this.state.data.data.forEach(function (data) {
                messages.push(<MailBoxItem type='inbox' handleViewDetail={this.props.handleViewDetail} key={data.id} data={data}/>)
            }.bind(this));
            return (
                <div>
                    <table className="table table-hover table-mail allow-long-word">
                        <thead>
                        <tr>
                            <th width="1%"></th>
                            <th>{t.header.from}</th>
                            <th>{t.header.subject}</th>
                            <th className="text-right mail-date">{t.header.received_date}</th>
                        </tr>
                        </thead>
                        <tbody >
                        {messages}
                        </tbody>
                    </table>
                    <div className="text-center">
                        <ReactPaginate previousLabel={"<"}
                                       nextLabel={">"}
                                       previousClassName={"previous pull-left m-t-xs m-r"}
                                       nextClassName={"next pull-left m-t-xs m-l"}
                                       breakLabel={<li className="break"><a href="">...</a></li>}
                                       pageNum={this.state.pageNum}
                                       marginPagesDisplayed={2}
                                       pageRangeDisplayed={5}
                                       clickCallback={this.handlePageClick}
                                       containerClassName={"pagination btn-group"}
                                       subContainerClassName={" pagination btn-group pull-left m-t-xs"}
                                       activeClassName={"active"}
                            />
                    </div>
                </div>
            );
        }
        else {
        return (
            <table className="table table-hover table-mail">
                <thead>
                <tr>
                    <th width="1%"></th>
                    <th>{t.header.from}</th>
                    <th>{t.header.subject}</th>
                    <th className="text-right mail-date">{t.header.received_date}</th>
                </tr>
                </thead>
                {(
                    this.state.loading==true ?

                        <tbody>
                        <tr>
                            <td></td>
                            <td colSpan="3" className="text-center">
                                <em> {t.no_message_hint}</em>
                            </td>
                        </tr>
                        </tbody>
                        :
                        <tbody >
                        <tr>
                            <td></td>
                            <td className="text-center"><div className="shimer">&nbsp;</div></td>
                            <td className="text-center"><div className="shimer">&nbsp;</div></td>
                            <td className="text-center"><div className="shimer">&nbsp;</div></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td className="text-center"><div className="shimer">&nbsp;</div></td>
                            <td className="text-center"><div className="shimer">&nbsp;</div></td>
                            <td className="text-center"><div className="shimer">&nbsp;</div></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td className="text-center"><div className="shimer">&nbsp;</div></td>
                            <td className="text-center"><div className="shimer">&nbsp;</div></td>
                            <td className="text-center"><div className="shimer">&nbsp;</div></td>
                        </tr>
                        </tbody>

                )}

            </table>
        );
        }
    }
}
MailBoxInbox.contextTypes = {lang: React.PropTypes.number, t: React.PropTypes.any};