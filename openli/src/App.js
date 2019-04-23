import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';

import Posts from './components/Posts';
import PostForm from './components/Postform';
import Dictaphone from './components/Dictaphone';

import store from './store';

class App extends Component {
  state = {
    transcript: ''
  };

  render() {
    return (
      <Provider store={store}>
        <div className='App'>
          <header className='App-header'>
            <Dictaphone />
          </header>
        </div>
      </Provider>
    );
  }
}

export default App;
