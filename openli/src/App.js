import React, { Component } from 'react';
// import './App.css';
import { Provider } from 'react-redux';

import Posts from './components/Posts';
import PostForm from './components/Postform';
import Dictaphone from './components/Dictaphone';

import store from './store';
import Layout from './components/Layout';

class App extends Component {
  state = {
    transcript: ''
  };

  render() {
    return (
      <Provider store={store}>
        <div className='App'>
          <Layout />
        </div>
      </Provider>
    );
  }
}

export default App;
