import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Header from './components/Header';

@inject('store')
@observer
export default class App extends Component {
  render() {
    return (
      <div style={styles.root}>
        <Header />
      </div>
    );
  }
}

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  }
};
