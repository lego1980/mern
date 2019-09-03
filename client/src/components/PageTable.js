import React from 'react';
import { Table } from 'reactstrap';
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
                    <th>ID</th>
                    <th>Title</th>
                    <th>Description</th>
                </tr>
                </thead>
                <tbody>
                    {
                        this.props.data  !== null
                        ? 
                            this.props.data.pages.map((item, i) => (
                                <tr className={((id === item._id) ? "selected-row" : "")} key={'tr-'+item._id} onClick={()=>this.onClickHandler(item._id)}>
                                    <th>{item._id}</th>
                                    <td>{item.title}</td>
                                    <td>{item.description}</td>
                                </tr>
                            ))
                        : 
                            <tr>
                                <th rowSpan={3}>No Data...</th>
                            </tr>
                    }
                </tbody>
            </Table>
        );
    }
}