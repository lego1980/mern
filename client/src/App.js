// core
import React, { Component } from 'react';
import axios from 'axios';
import './App.css'

// components
import PageNav from './components/PageNav'
import PageSelect from './components/PageSelect';
import PageForm from './components/PageForm';
import PageTable from './components/PageTable';

class App extends Component {
  // initialize our state
  constructor(props){
    super(props);
    this.state = {
      selectedItem : '', //default      
      http: "http://",
      https: "https://",
      api: "localhost:3001/api/",
      apiVersion: "1.0",
      apiTarget: "/cms",
      apiUrl: null,
      data: null,
      showForm: false
    }
  }

  toggleShowForm = (bool) => {
    this.setState({
      showForm: bool
    });
  }

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

  UNSAFE_componentWillMount() {
    let that = this;
    this.setState({ apiUrl: this.state.http +  this.state.api + this.state.apiVersion + this.state.apiTarget },() => {
      that.getPages();
    });
  }

  getPages = () => {
    let that = this;
    axios.get(this.state.apiUrl+'/items')
      .then((items) => {
        that.setState({ data: items.data.response })
      })
  };

  addPage = (obj) => {  
    console.log("addPage",obj);  
    let that = this;
    axios.post(this.state.apiUrl+'/items', obj).then(res => {
      that.getPages();
    });   
  };

  deletePage = (obj) => {
    let that = this;
    let id = obj.id;
    axios.delete(this.state.apiUrl+'/items/'+id).then(res => {
      that.getPages();
      that.setState({ selectedItem : '' }) 
    });
  };

  updatePage = (obj) => {
    console.log('updatePage',obj);
    let that = this;
    let id = obj.id;
    axios.post(this.state.apiUrl+'/items/'+id, obj).then(res => {
      that.getPages();
      that.setState({ selectedItem : '' }) 
    });   
  };

  render() {
    const { data } = this.state;
    return (
      <div className={"app"}>
        <PageNav data={data} toggleShowForm={this.toggleShowForm} setSelection={this.setSelection} />
        <div className={"right-panel" + (this.state.showForm ? " show" : "")}>
          <PageSelect data={data} setSelection={this.setSelection} selectedItem={this.state.selectedItem} />
          <PageForm data={data} selectedItem={this.state.selectedItem} addHandler={this.addPage} deleteHandler={this.deletePage} updateHandler={this.updatePage} showFormHandler={this.toggleShowForm} />
        </div>
        <div className={"left-panel"}>
          <PageTable data={data} setSelection={this.setSelection} selectedItem={this.state.selectedItem} />
        </div>
      </div>      
    );
  }
}

export default App;