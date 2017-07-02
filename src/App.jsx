import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Header from './components/Header';
import RecentProjects from './components/RecentProjects';
import './styles/app.scss';

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
        <RecentProjects />
      </div>
    );
  }
}

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    backgroundColor: 'rgb(37,37,37)',
  }
};
