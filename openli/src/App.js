import React, { Component } from 'react';

// import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';

import configureStore from './configureStore';
import Layout from './layout/Layout';
Amplify.configure(aws_exports);

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

const signUpConfig = {
  hideAllDefaults: true,
  signUpFields: [
    {
      label: 'Email',
      key: 'username',
      required: true,
      placeholder: 'Email',
      type: 'email',
      displayOrder: 1
    },
    {
      label: 'Password',
      key: 'password',
      required: true,
      placeholder: 'Password',
      type: 'password',
      displayOrder: 2
    },
    {
      label: 'Name',
      key: 'name',
      required: true,
      placeholder: 'Name',
      type: 'string',
      displayOrder: 3
    },
    {
      label: 'Family Name',
      key: 'family_name',
      required: true,
      placeholder: 'Family Name',
      type: 'string',
      displayOrder: 4
    },
    {
      label: 'Gender',
      key: 'gender',
      required: true,
      placeholder: 'Gender',
      type: 'string',
      displayOrder: 5
    },
    {
      label: 'Birth Date',
      key: 'birthdate',
      required: true,
      placeholder: 'Birth Date',
      type: 'date',
      displayOrder: 6
    }
  ]
};
export default withAuthenticator(App, { signUpConfig });

// export default withAuthenticator(App, true, { signUpConfig });
