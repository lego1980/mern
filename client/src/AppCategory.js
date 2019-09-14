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
      showCategoryForm: false
    }
  }  

  UNSAFE_componentWillMount() {
    let that = this;
    this.setState({ apiUrl: this.state.http +  this.state.api + this.state.apiVersion + this.state.apiTarget },() => {
      that.getCategories();
    });
  }

  //category
  getCategories = () => {
    let that = this;
    axios.get(this.state.apiUrl+'/category')
      .then((items) => {
        that.setState({ dataCategory: items.data.response })
      })
  };

  addCategory= (obj) => {   
    let that = this;
    axios.post(this.state.apiUrl+'/category', obj).then(res => {
      that.getCategories();
    });   
  };

  deleteCategory = (obj) => {
    let that = this;
    let id = obj.id;
    axios.delete(this.state.apiUrl+'/category/'+id).then(res => {
      that.getCategories();
      that.setState({ selectedCategory : '' }) 
    });
  };

  updateCategory = (obj) => {
    let that = this;
    let id = obj.id;
    axios.post(this.state.apiUrl+'/category/'+id, obj).then(res => {
      that.getCategories();
      that.setState({ selectedCategory : '' }) 
    });   
  };

  setSelection = (id) => {
    let that = this;   
    if (id !== null && id !== '') {
      let item = this.state.data.items.find(
        ({ _id }) => _id === id
      );
      that.setState({ selectedCategory : item })
      that.toggleShowCategoryForm(true);  
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
        <CategoryNav data={dataCategory} toggleShowForm={this.toggleShowForm} setSelection={this.setSelection} />
        <div className={"right-panel" + (this.state.showCategoryForm ? " show" : "")}>
          <CategorySelect data={dataCategory} setSelection={this.setSelection} selectedCategory={this.state.selectedCategory} />
          <CategoryForm data={dataCategory} selectedCategory={this.state.selectedCategory} addHandler={this.addCategory} deleteHandler={this.deleteCategory} updateHandler={this.updateCategory} showFormHandler={this.toggleShowForm} />
        </div>
        <div className={"left-panel"}>
          <CategoryTable data={dataCategory} setSelection={this.setSelection} selectedCategory={this.state.selectedCategory} />
        </div>
      </div>      
    );
  }
}

export default AppCategory;