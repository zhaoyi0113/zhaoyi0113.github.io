import React from 'react';
import CircleButton from './CircleButton';

/**
 * the web page header component
 */
const Header = () => (
  <div style={styles.root} className="header">
    <CircleButton />
  </div>
);

export default Header;

const styles = {
  root: {
    display: 'flex',
    width: '100%',
    height: '450px',
    backgroundImage: 'url(../assets/img/billboard-bg.jpg)'
  }
};
