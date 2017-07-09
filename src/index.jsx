import React from 'react';
import ReactDOM from 'react-dom';
import {useStrict} from 'mobx';
import {Provider} from 'mobx-react';
import { Router, Route, hashHistory } from 'react-router';

import Store from './Store';
import App from './App.jsx';
import ProfileList from './components/ProfileList';

// use mobx strict mode to prevent modifying store state from non-action method
useStrict(true);

const store = new Store();

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App} />
      <Route path="/pl" component={ProfileList} />
    </Router>
  </Provider>, document.getElementById('root'));
