import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './App';
import { GlobalStyles } from './global-styles';
import 'normalize.css';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Reducers from './Reducers';
import Test from './Test'
const store = createStore(Reducers, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
      <GlobalStyles />
      <App />
  </Provider>,
  document.getElementById('root')
);
