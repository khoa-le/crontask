import React, { Component } from 'react';
import moment from 'moment';

export default class MailBoxTemplateItem extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        if(this.context.lang==1){
            moment.locale('vi');
        }else{
            moment.locale('en');
        }
        return (
            <tr className="read">
                <td></td>
                <td className="mail-subject">
                        <a onClick={this.props.handleViewDetail.bind(this,this.props.data)}>
                            {this.props.data.type=="1"? <span className="label label-info" title="VNW' Templates">VNW</span>:null}
                            &nbsp;{ this.props.data.title }
                        </a>
                </td>
                <td className="text-right mail-date">
                    { moment(this.props.data.updated_date).fromNow() }
                </td>
            </tr>
        );

    };
}
MailBoxTemplateItem.contextTypes = { lang: React.PropTypes.number,t:React.PropTypes.any};
