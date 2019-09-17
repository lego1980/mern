// core
import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css'

// components
import AppPage from './AppPage'
import AppCategory from './AppCategory';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {         
      http: "http://",
      https: "https://",
      api: "localhost:3001/api/",
      apiVersion: "1.0",
      apiTarget: "/cms",
      apiUrl: null,
      listCategories: null
    }
  }

  UNSAFE_componentWillMount() {
    let that = this;
    this.setState({ apiUrl: this.state.http +  this.state.api + this.state.apiVersion + this.state.apiTarget },() => {
      that.getListCategories();
    });
  }

  getListCategories = () => {
    let that = this;
    axios.get(this.state.apiUrl + "/category/listCategories")
      .then((items) => {
        that.setState({ listCategories: items.data.response })
      })
  };

  render() {
    const { listCategories } = this.state;
    return (
        <Router>
            <Route render={(props) => (
              <Switch location={props.location}>
                <Route
                  path='/item/'
                  exact                      
                  render={(props) => <AppPage listCategories={listCategories} {...props} />}
                />
                <Route
                  path='/category/'
                  exact                      
                  render={(props) => <AppCategory {...props} />}
                />
                <Route
                  path='/'
                  exact                      
                  render={(props) => <AppPage listCategories={listCategories} {...props} />}
                />
              </Switch>
            )} />
        </Router> 
    );
  }
}

export default App;