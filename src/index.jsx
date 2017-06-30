import React from 'react';
import ReactDOM from 'react-dom';
import mobx, { useStrict } from 'mobx';
import { Provider } from 'mobx-react';
import Store from './Store';
import App from './App.jsx';

// use mobx strict mode to prevent modifying store state from non-action method
useStrict(true);

const store = new Store();

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root')
);
