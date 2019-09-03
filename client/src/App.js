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
      selectedItem : 'add', //default      
      http: "http://",
      https: "https://",
      apiVersion: "1.0",
      api: "localhost:3001/api/",
      apiUrl: null,
      _id: 0,
      title: null,
      subtitle: null,
      description: null,
      keywords: null,
      content: null,
      likes: 0,
      images: [],
      data: null,
      intervalIsSet: false,
      idToDelete: null,
      idToUpdate: null,
      objectToUpdate: null,
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
      that.setState({ selectedItem : 'add' })  
    }
  }

  componentWillMount() {
    this.setState({ apiUrl: this.state.http +  this.state.api + this.state.apiVersion });
  }
  
  componentDidMount() {    
    this.getDataFromDb();
  }

  getDataFromDb = () => {
    let that = this;
    axios.get(this.state.apiUrl+'/pages')
      .then((data) => {
        that.setState({ data: data.data.response })
      })
  };

  addPage = (obj) => {    
    let that = this;
    axios.post(this.state.apiUrl+'/pages', obj).then(res => {
      that.getDataFromDb();
    });   
  };

  deletePage = (obj) => {
    let that = this;
    let id = obj.id;
    axios.delete(this.state.apiUrl+'/pages/'+id).then(res => {
      that.getDataFromDb();
      that.setState({ selectedItem : 'add' }) 
    });
  };

  updatePage = (obj) => {
    let that = this;
    let id = obj.id;
    axios.post(this.state.apiUrl+'/pages/'+id, obj).then(res => {
      that.getDataFromDb();
      that.setState({ selectedItem : 'add' }) 
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