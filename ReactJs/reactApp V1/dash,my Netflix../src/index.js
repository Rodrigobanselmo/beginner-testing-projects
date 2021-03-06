import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import {App} from './App';
import { GlobalStyles } from './global-styles';
import { firebase } from './lib/firebase.prod';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <>
      <GlobalStyles />
      <App />
  </>,
  document.getElementById('root')
);
