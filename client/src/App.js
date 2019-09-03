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
      data: null
    }
  }

  setSelection = (id) => {
    let that = this;   
    if (id !== null && id !== 'add') {
      let item = this.state.data.pages.find(
        ({ _id }) => _id === id
      );
      that.setState({ selectedItem : item })  
    } else {
      that.setState({ selectedItem : '' })  
    }
  }

  UNSAFE_componentWillMount() {
    this.setState({ apiUrl: this.state.http +  this.state.api + this.state.apiVersion });
  }
  
  componentDidMount() {    
    this.getPages();
  }

  getPages = () => {
    let that = this;
    axios.get(this.state.apiUrl+'/pages')
      .then((pages) => {
        that.setState({ data: pages.data.response })
      })
  };

  addPage = (obj) => {    
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
        <div className={"right-panel"}>
          <PageSelect data={data} setSelection={this.setSelection} selectedItem={this.state.selectedItem} />
          <PageForm data={data} selectedItem={this.state.selectedItem} addHandler={this.addPage} deleteHandler={this.deletePage} updateHandler={this.updatePage} />
        </div>
        <div className={"left-panel"}>
          <PageTable data={data} setSelection={this.setSelection} selectedItem={this.state.selectedItem} />
        </div>
      </div>      
    );
  }
}

export default App;