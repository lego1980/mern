import React from 'react';
import { Table, Badge } from 'reactstrap';
import Moment from 'react-moment';
import './PageTable.css';

export default class PageTable extends React.Component {
    onClickHandler = (id) => {
        this.props.setSelection(id);
    }
    render() {
        let {id} = '';
        if (this.props.selectedItem !== null) {
            id = this.props.selectedItem._id;
        } else {
            id = '';
        }
        return (
            <Table hover className={'page-table'}>
                <thead>
                <tr>
                    <th>    
                        {
                            this.props.data !== null
                            ?
                                <Badge className="page-badge" color="primary">{this.props.data.count}</Badge>
                            :
                                null
                        }
                    </th>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Content</th>
                    <th>Created</th>
                    <th>Updated</th>
                    <th>Active</th>
                </tr>
                </thead>
                <tbody>
                    {
                        this.props.data !== null
                        ? 
                            this.props.data.pages.map((item, i) => (
                                <tr className={((id === item._id) ? "selected-row" : "")} key={'tr-'+item._id} onClick={()=>this.onClickHandler(item._id)}>
                                    <td>#{i+1}</td>
                                    <td>{item._id}</td>
                                    <td>{item.title}</td>
                                    <td>{item.description}</td>
                                    <td>{item.content}</td>
                                    <td><Moment>{item.createdAt}</Moment></td>                                                                  
                                    <td><Moment>{item.updatedAt}</Moment></td>
                                    <td>{ item.active ? 'true' : 'false'}</td>
                                </tr>
                            ))
                        : 
                            <tr>
                                <th rowSpan={7}>No Data...</th>
                            </tr>
                    }
                </tbody>
            </Table>
        );
    }
}