import React, { Component } from 'react';
import MailBoxTemplateItem from './mailbox_template_item.js';
import ReactPaginate from 'react-paginate';


export default class MailBoxTemplate extends Component{
    constructor(props){
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
    render(){
        var templates = [];
        var t=this.context.t;
        if (this.state.data.total > 0 && this.state.loading) {
            this.state.data.data.forEach(function (data) {
                templates.push(<MailBoxTemplateItem handleViewDetail={this.props.handleViewDetail} key={data.id+data.type+data.language_id} data={data}/>)
            }.bind(this));
            return (
                <div>
                    <table className="table table-hover table-mail table-sent allow-long-word">
                        <thead>
                        <tr>
                            <th  width="1%"></th>
                            <th>{t.header.template_name}</th>
                            <th className="text-right mail-date">{t.header.modified_date}</th>
                        </tr>
                        </thead>
                        <tbody >
                        {templates}
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
                <table className="table table-hover table-mail table-sent ">
                    <thead>
                    <tr>
                        <th  width="1%"></th>
                        <th>{t.header.template_name}</th>
                        <th className="text-right mail-date">{t.header.modified_date}</th>
                    </tr>
                    </thead>
                    {(
                        this.state.loading==true ?

                            <tbody>
                            <tr>
                                <td></td>
                                <td colSpan="2" className="text-center">
                                    <em> {t.no_template_hint}</em>
                                </td>
                            </tr>
                            </tbody>
                            :
                            <tbody >
                                <tr>
                                    <td></td>
                                    <td className="text-center"><div className="shimer">&nbsp;</div></td>
                                    <td className="text-center"><div className="shimer">&nbsp;</div></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td className="text-center"><div className="shimer">&nbsp;</div></td>
                                    <td className="text-center"><div className="shimer">&nbsp;</div></td>
                                </tr>
                                <tr>
                                    <td></td>
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
MailBoxTemplate.contextTypes = { lang: React.PropTypes.number,t:React.PropTypes.any};