import React, { Component } from 'react';
// import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import configureStore from './configureStore';
import Layout from './layout/Layout';

const store = configureStore();

class App extends Component {
  state = {
    transcript: ''
  };

  render() {
    return (
      <Router>
        <Provider store={store}>
          <div className='App'>
            <Layout />
          </div>
        </Provider>
      </Router>
    );
  }
}

export default App;
