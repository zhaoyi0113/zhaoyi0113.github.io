import React from 'react';
import { observer } from 'mobx-react';
import CircleButton from './CircleButton';
import UserInfo from './UserInfo';

const NavigationItem = ({ icon, link }) => {
  const style = {
    ...styles.navigationItem
  };
  return (
    <div style={style}>
      <img
        src={icon}
        width="30"
        height="30"
        alt="loading"
        style={{ display: 'block', margin: '10px auto auto auto' }}
      />
    </div>
  );
};

const Header = observer(({ navigationItems, userInfo }) => {
  return (
    <div style={styles.root} className="header">
      <div style={styles.titleButtonPanel}>
        <CircleButton />
      </div>
      <div style={styles.navigationBar}>
        {navigationItems.map(item => (
          <NavigationItem key={item.id} icon={item.icon} />
        ))}
      </div>
      <UserInfo userInfo={userInfo} />
    </div>
  );
});

export default Header;

const styles = {
  root: {
    display: 'flex',
    width: '100%',
    height: '450px',
    backgroundImage: 'url(../assets/img/billboard-bg.jpg)'
  },
  titleButtonPanel: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    right: 30,
    top: 40
  },
  navigationBar: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    left: 50,
    top: 100
  },
  navigationItem: {
    width: 50,
    height: 50,
    backgroundColor: 'rgb(244,240,229)',
    marginBottom: 1
  }
};
