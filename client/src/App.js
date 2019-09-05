// core
import React, { Component } from 'react';
import axios from 'axios';
import './App.css'

// components
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
      apiVersion: "1.0",
      api: "localhost:3001/api/",
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
      let item = this.state.data.pages.find(
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
    this.setState({ apiUrl: this.state.http +  this.state.api + this.state.apiVersion },() => {
      that.getPages();
    });
  }

  getPages = () => {
    let that = this;
    axios.get(this.state.apiUrl+'/pages')
      .then((pages) => {
        that.setState({ data: pages.data.response })
      })
  };

  addPage = (obj) => {  
    console.log("addPage",obj);  
    let that = this;
    axios.post(this.state.apiUrl+'/pages', obj).then(res => {
      that.getPages();
    });   
  };

  deletePage = (obj) => {
    let that = this;
    let id = obj.id;
    axios.delete(this.state.apiUrl+'/pages/'+id).then(res => {
      that.getPages();
      that.setState({ selectedItem : '' }) 
    });
  };

  updatePage = (obj) => {
    console.log('updatePage',obj);
    let that = this;
    let id = obj.id;
    axios.post(this.state.apiUrl+'/pages/'+id, obj).then(res => {
      that.getPages();
      that.setState({ selectedItem : '' }) 
    });   
  };

  render() {
    const { data } = this.state;
    return (
      <div className={"app"}>
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