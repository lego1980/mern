// core
import React, { Component } from 'react';
import axios from 'axios';

// components
import PageNav from './components/PageNav'
import PageSelect from './components/PageSelect';
import PageForm from './components/PageForm';
import PageTable from './components/PageTable';

class AppPage extends Component {
  // initialize our state
  constructor(props){    
    super(props);
    this.state = {         
      http: "http://",
      https: "https://",
      api: "localhost:3001/api/",
      apiVersion: "1.0",
      apiTarget: "/cms",
      apiUrl: null,
      data: null,
      selectedItem: '', //default 
      showForm: false,
      sortOrder:  -1,
      sortField: 'updatedBy',
      sortParams: null,
      collection: "item",
      pageNo: 1, //default
      limitPerPage: 5 //default
    }   
  }  

  UNSAFE_componentWillMount() {
    let that = this;
    this.setState({ sortParams : "?sortField="+this.state.sortField+"&sortOrder="+this.state.sortOrder + that.state.sortParams+"&pageNo="+that.state.pageNo+"&limitPerPage="+that.state.limitPerPage }, () => {
      that.setState({ apiUrl: that.state.http +  that.state.api + that.state.apiVersion + that.state.apiTarget + "/" + that.state.collection},() => {
        that.getPages();
      });
    });
  }

  sortToggle = (params) => {
    let that = this;
    if (params.hasOwnProperty("sortField")) {
      let sortOrder = (that.state.sortOrder === 1) ? -1 : 1;
      that.setState({ sortField : params.sortField, sortOrder : sortOrder }, () => {
        that.setState({ sortParams : "?sortField="+that.state.sortField+"&sortOrder="+that.state.sortOrder+"&pageNo="+that.state.pageNo+"&limitPerPage="+that.state.limitPerPage }, () => {
          that.setState({ apiUrl: that.state.http +  that.state.api + that.state.apiVersion + that.state.apiTarget + "/" + that.state.collection + that.state.sortParams },() => {
            that.getPages();
          });
        });
      })
    } else {
      console.log("Params propeties are undefined");
    }    
  }

  pagination = (params) => {
    let that = this;
    if (params.hasOwnProperty("pageNo") && params.hasOwnProperty("limitPerPage")) {
      let sortOrder = (that.state.sortOrder === 1) ? -1 : 1;
      that.setState({ limitPerPage : params.limitPerPage, pageNo : params.pageNo }, () => {
        that.setState({ sortParams : "?sortField="+that.state.sortField+"&sortOrder="+that.state.sortOrder+"&pageNo="+that.state.pageNo+"&limitPerPage="+that.state.limitPerPage }, () => {
          that.setState({ apiUrl: that.state.http +  that.state.api + that.state.apiVersion + that.state.apiTarget + "/" + that.state.collection + that.state.sortParams },() => {
            that.getPages();
          });
        });
      })
    } else {
      console.log("Params propeties are undefined");
    }    
  }

  //page
  getPages = () => {
    let that = this;
    axios.get(this.state.apiUrl)
      .then((items) => {
        that.setState({ data: items.data.response })
      })
  };

  addPage = (obj) => {
    let that = this;
    axios.post(this.state.apiUrl + "/item", obj).then(res => {
      that.getPages();
    });   
  };

  deletePage = (obj) => {
    let that = this;
    let id = obj.id;
    axios.delete(this.state.apiUrl + "/item/" + id).then(res => {
      that.getPages();
      that.setState({ selectedItem : '' }) 
    });
  };

  updatePage = (obj) => {
    let that = this;
    let id = obj.id;
    axios.post(this.state.apiUrl + "/item/" + id, obj).then(res => {
      that.getPages();
      that.setState({ selectedItem : '' }) 
    });   
  };

  setSelection = (id) => {
    let that = this;   
    if (id !== null && id !== '') {
      let item = this.state.data.items.find(
        ({ _id }) => _id === id
      );
      that.setState({ selectedItem : item })
      that.toggleShowForm(true);  
    } else {
      that.setState({ selectedItem : '' })  
    }
  }

  toggleShowForm = (bool) => {
    this.setState({
      showForm: bool
    });
  }

  render() {
    const { data } = this.state;
    return (
      <div className={"app"}>
        <PageNav data={data} toggleShowForm={this.toggleShowForm} setSelection={this.setSelection} pagination={this.pagination} />
        <div className={"right-panel" + (this.state.showForm ? " show" : "")}>
          <PageSelect data={data} setSelection={this.setSelection} selectedItem={this.state.selectedItem} />
          <PageForm data={data} listCategories={this.props.listCategories} selectedItem={this.state.selectedItem} addHandler={this.addPage} deleteHandler={this.deletePage} updateHandler={this.updatePage} showFormHandler={this.toggleShowForm} />
        </div>
        <div className={"left-panel"}>
          <PageTable data={data} setSelection={this.setSelection} selectedItem={this.state.selectedItem} sortToggle={this.sortToggle} />
        </div>
      </div>      
    );
  }
}

export default AppPage;