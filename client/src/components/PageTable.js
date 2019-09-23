import React from 'react';
import { Table, Button } from 'reactstrap';
import Moment from 'react-moment';
import './PageTable.css';

export default class PageTable extends React.Component {
    onClickHandler = (id) => {
        this.props.setSelection(id);
    }
    onSortClickHandler = (e, params) => {
        this.props.sortToggle(params);
    };
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
                    <th>#</th>
                    <th>ID</th>
                    <th><Button onClick={(e) => this.onSortClickHandler(e, { sortField : 'title' })} color="link">Title &uarr;&darr;</Button></th>
                    <th><Button onClick={(e) => this.onSortClickHandler(e, { sortField : 'category' })} color="link">Category &uarr;&darr;</Button></th>
                    <th>Content</th>
                    <th><Button onClick={(e) => this.onSortClickHandler(e, { sortField : 'createdAt' })} color="link">Created &uarr;&darr;</Button></th>
                    <th><Button onClick={(e) => this.onSortClickHandler(e, { sortField : 'updatedAt' })} color="link">Updated &uarr;&darr;</Button></th>
                    <th>Active</th>
                </tr>
                </thead>
                <tbody>
                    {
                        this.props.data !== null
                        ? 
                            this.props.data.items.map((item, i) => (
                                <tr className={((id === item._id) ? "selected-row" : "")} key={'tr-'+item._id} onClick={()=>this.onClickHandler(item._id)}>
                                    <td>{i+1}</td>
                                    <td>{item._id}</td>
                                    <td><a href={"http://localhost:3000/"+item.category+"/"+item.url} target="_blank" rel="noopener noreferrer">{item.title}</a></td>
                                    <td>{item.category}</td>
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