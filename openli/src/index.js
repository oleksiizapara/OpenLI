import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App, { MockedApp } from './App';
import registerServiceWorker from './registerServiceWorker';
import WebFont from 'webfontloader';
import { Analytics } from '../node_modules/aws-amplify/lib/index';

if (process.env.NODE_ENV !== 'production') {
  Analytics.disable();
}

if (
  process.env.NODE_ENV === 'development' &&
  process.env.REACT_APP_IS_MOCKED === 'true'
) {
  ReactDOM.render(<MockedApp />, document.getElementById('root'));
  registerServiceWorker();
} else {
  ReactDOM.render(<App />, document.getElementById('root'));
  registerServiceWorker();
}

WebFont.load({
  google: {
    families: ['Roboto:300,400,500', 'Material+Icons']
  }
});
