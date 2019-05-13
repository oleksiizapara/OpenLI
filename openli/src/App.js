import React, { Component } from 'react';

import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';

import configureStore from './configureStore';
import mockedConfigureStore from 'mocks/mockedConfigureStore';

import Layout from './layout/Layout';

Amplify.configure(aws_exports);

const store = configureStore();
const mockedStore = mockedConfigureStore();

export default function App() {
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

export function MockedApp() {
  return (
    <Router>
      <Provider store={mockedStore}>
        <div className='App'>
          <Layout />
        </div>
      </Provider>
    </Router>
  );
}

// const signUpConfig = {
//   hideAllDefaults: true,
//   signUpFields: [
//     {
//       label: 'Email',
//       key: 'username',
//       required: true,
//       placeholder: 'Email',
//       type: 'email',
//       displayOrder: 1
//     },
//     {
//       label: 'Password',
//       key: 'password',
//       required: true,
//       placeholder: 'Password',
//       type: 'password',
//       displayOrder: 2
//     },
//     {
//       label: 'Name',
//       key: 'name',
//       required: true,
//       placeholder: 'Name',
//       type: 'string',
//       displayOrder: 3
//     },
//     {
//       label: 'Family Name',
//       key: 'family_name',
//       required: true,
//       placeholder: 'Family Name',
//       type: 'string',
//       displayOrder: 4
//     }
//   ]
// };
// export default withAuthenticator(App, { signUpConfig });

// export default withAuthenticator(App, true, { signUpConfig });
