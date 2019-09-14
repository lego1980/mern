// core
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import './App.css'

// components
import AppPage from './AppPage'
import AppCategory from './AppCategory';

class App extends Component {
  render() {
    return (
        <Router>
            <Route render={(props) => (
              <Switch location={props.location}>
                <Route
                  path='/item/'
                  exact                      
                  render={(props) => <AppPage {...props} />}
                />
                <Route
                  path='/category/'
                  exact                      
                  render={(props) => <AppCategory {...props} />}
                />
                <Route
                  path='/'
                  exact                      
                  render={(props) => <AppPage {...props} />}
                />
              </Switch>
            )} />
        </Router> 
    );
  }
}

export default App;