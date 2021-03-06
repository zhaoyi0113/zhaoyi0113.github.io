import React from 'react';
import { observer } from 'mobx-react';
import ReactTooltip from 'react-tooltip';
import CircleButton from './CircleButton';
import UserInfo from './UserInfo';
import NavigationBar from './NavigationBar';

const Header = observer(({ navigationItems, userInfo }) => (
  <div style={styles.root} className="header">
    <div style={styles.titleButtonPanel}>
      <CircleButton
        icon="../assets/img/facebook.png"
        name="Facebook"
        link="https://www.facebook.com/yi.zhao.35110"
      />
      <CircleButton
        icon="../assets/img/linkedin-logo.png"
        name="LinkedIn"
        link="https://linkedin.com/in/yi-zhao-04735574"
      />
      <CircleButton
        icon="../assets/img/git-logo.png"
        name="Github"
        link="https://github.com/zhaoyi0113"
      />
    </div>
    <div style={styles.navigationBar}>
      <NavigationBar navigationItems={navigationItems}/>
    </div>
    <UserInfo userInfo={userInfo} />
  </div>
));

export default Header;

const styles = {
  root: {
    display: 'flex',
    width: '100%',
    height: '480px',
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
    left: 200,
    top: 100
  },
  navigationItem: {
    width: 50,
    height: 50,
    backgroundColor: 'rgb(244,240,229)',
    marginBottom: 1
  }
};
