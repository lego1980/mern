import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import './ItemPagination.css';

export default class ItemPagination extends React.Component {
  paginationHandler = (params,e) => {
    e.preventDefault();
    this.props.pagination(params);
  }
  
  paginationItem = (page, selectedPage, limit) => {
    if (page === selectedPage) {
      return(
        <PaginationItem active key={"page-"+page}>
          <button href="#" onClick={(e) => this.paginationHandler({ pageNo: page, limitPerPage: limit }, e)}>
            {page}
          </button>
        </PaginationItem>
      )
    } else {
      return(
        <PaginationItem key={"page-"+page}>
          <button href="#" onClick={(e) => this.paginationHandler({ pageNo: page, limitPerPage: limit }, e)}>
            {page}
          </button>
        </PaginationItem>
      )
    }
  }

  render() {

    const items = []

    for (var i = 0; i < this.props.data.totalPages; i++) {
      items[i] = this.paginationItem(i+1,this.props.data.pageNo,this.props.data.limit);
    }
    
    return (      
      <Pagination aria-label="Page navigation example" className={"item-pagination"}>
        <PaginationItem>
          <button onClick={(e) => this.paginationHandler({ pageNo: 1, limitPerPage: this.props.data.limit }, e)}>First</button>
        </PaginationItem>
        <PaginationItem>
          <button onClick={(e) => this.paginationHandler({ pageNo: (this.props.data.pageNo <= 1) ? 1 : this.props.data.pageNo - 1, limitPerPage: this.props.data.limit }, e)}>Previous</button>
        </PaginationItem>
        {
          this.props.data.totalPages !== 0
          ?
            items
          :
            null
        }
        <PaginationItem>
          <button onClick={(e) => this.paginationHandler({ pageNo: this.props.data.pageNo + 1, limitPerPage: this.props.data.limit }, e)}>Next</button>
        </PaginationItem>
        <PaginationItem>
          <button onClick={(e) => this.paginationHandler({ pageNo: this.props.data.totalPages, limitPerPage: this.props.data.limit }, e)}>Last</button>
        </PaginationItem>
      </Pagination>
    );
  }
}