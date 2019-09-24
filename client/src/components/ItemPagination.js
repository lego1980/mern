import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import './ItemPagination.css';

export default class ItemPagination extends React.Component {
  paginationHandler = (params,e) => {
    e.preventDefault();
    this.props.pagination(params);
  }
  
  paginationItem = (page,selectedPage) => {
    if (page === selectedPage) {
      return(
        <PaginationItem active>
          <button href="#" onClick={(e) => this.paginationHandler({ pageNo: page, limitPerPage: 5 }, e)}>
            {page}
          </button>
        </PaginationItem>
      )
    } else {
      return(
        <PaginationItem>
          <button href="#" onClick={(e) => this.paginationHandler({ pageNo: page, limitPerPage: 5 }, e)}>
            {page}
          </button>
        </PaginationItem>
      )
    }
  }

  render() {

    const items = []

    for (var i = 0; i < this.props.data.totalPages; i++) {
      items[i] = this.paginationItem(i+1,this.props.data.pageNo);
    }
    
    return (      
      <Pagination aria-label="Page navigation example" className={"item-pagination"}>
        {
          this.props.data.totalPages !== 0
          ?
            items
          :
            null
        }
      </Pagination>
    );
  }
}