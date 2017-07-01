import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Header from './components/Header';

@inject('store')
@observer
export default class App extends Component {
  render() {
    const { store } = this.props;
    return (
      <div style={styles.root}>
        <Header
          navigationItems={store.navigationItems}
          userInfo={store.userInfo}
        />
      </div>
    );
  }
}

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  }
};
