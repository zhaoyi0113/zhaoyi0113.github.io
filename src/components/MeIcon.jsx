import React from 'react';
import {Link} from 'react-router';

const Me = () => (
  <div style={styles.root} className="mouse-hover-pointer">
    <Link
      className="mouse-hover-pointer"
      to="/"
    >
      <img
        style={{borderRadius: '50%'}}
        src="../assets/img/me.jpg"
        width="50"
        height="50"
      />
    </Link>
  </div>
);

export default Me;

const styles = {
  root: {
    position: 'absolute',
    top: 50,
    left: 100,
  },
};
