// core
import React, { Component } from 'react';
import axios from 'axios';

// components
import CategoryNav from './components/CategoryNav'
import CategorySelect from './components/CategorySelect';
import CategoryForm from './components/CategoryForm';
import CategoryTable from './components/CategoryTable';

class AppCategory extends Component {
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
      dataCategory: null,
      selectedCategory : '', //default 
      showCategoryForm: false,
      sortOrder:  -1,
      sortField: 'updatedBy',
      sortParams: null,
      collection: "category"
    }
  }  

  UNSAFE_componentWillMount() {
    let that = this;
    this.setState({ sortParams : "?sortField="+this.state.sortField+"&sortOrder="+this.state.sortOrder + that.state.sortParams }, () => {
      that.setState({ apiUrl: that.state.http +  that.state.api + that.state.apiVersion + that.state.apiTarget + "/" + that.state.collection},() => {
        that.getCategories();
      });
    });
  }

  sortToggle = (params) => {
    let that = this;
    console.log("that.state.sortOrder cateogry",that.state.sortOrder);
    if (params.hasOwnProperty("sortField")) {
      let sortOrder = (that.state.sortOrder === 1) ? -1 : 1;
      that.setState({ sortField : params.sortField, sortOrder : sortOrder }, () => {
        that.setState({ sortParams : "?sortField="+that.state.sortField+"&sortOrder="+that.state.sortOrder }, () => {
          that.setState({ apiUrl: that.state.http +  that.state.api + that.state.apiVersion + that.state.apiTarget + "/" + that.state.collection + that.state.sortParams },() => {
            that.getCategories();
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
            that.getCategories();
          });
        });
      })
    } else {
      console.log("Params propeties are undefined");
    }    
  }
  
  //category
  getCategories = () => {
    let that = this;
    axios.get(this.state.apiUrl)
      .then((items) => {
        that.setState({ dataCategory: items.data.response })
      })
  };

  addCategory= (obj) => {   
    let that = this;
    axios.post(this.state.apiUrl + "/category", obj).then(res => {
      that.getCategories();
    });   
  };

  deleteCategory = (obj) => {
    let that = this;
    let id = obj.id;
    axios.delete(this.state.apiUrl + "/category/" + id).then(res => {
      that.getCategories();
      that.setState({ selectedCategory : '' }) 
    });
  };

  updateCategory = (obj) => {
    let that = this;
    let id = obj.id;
    axios.post(this.state.apiUrl + "/category/" + id, obj).then(res => {
      that.getCategories();
      that.setState({ selectedCategory : '' }) 
    });   
  };

  setSelection = (id) => {
    let that = this;   
    if (id !== null && id !== '') {
      let item = this.state.dataCategory.items.find(
        ({ _id }) => _id === id
      );
      that.setState({ selectedCategory : item })
      that.toggleShowForm(true);  
    } else {
      that.setState({ selectedCategory : '' })  
    }
  }

  toggleShowForm = (bool) => {
    this.setState({
      showCategoryForm: bool
    });
  }

  render() {
    const { dataCategory } = this.state;
    return (
      <div className={"app"}>
        <CategoryNav data={dataCategory} toggleShowForm={this.toggleShowForm} setSelection={this.setSelection} pagination={this.pagination} />
        <div className={"right-panel" + (this.state.showCategoryForm ? " show" : "")}>
          <CategorySelect data={dataCategory} setSelection={this.setSelection} selectedCategory={this.state.selectedCategory} />
          <CategoryForm data={dataCategory} selectedCategory={this.state.selectedCategory} addHandler={this.addCategory} deleteHandler={this.deleteCategory} updateHandler={this.updateCategory} showFormHandler={this.toggleShowForm} />
        </div>
        <div className={"left-panel"}>
          <CategoryTable data={dataCategory} setSelection={this.setSelection} selectedCategory={this.state.selectedCategory} sortToggle={this.sortToggle} />
        </div>
      </div>      
    );
  }
}

export default AppCategory;