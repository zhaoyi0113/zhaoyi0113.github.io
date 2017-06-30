import React from 'react';

const styles = {
  root: {
    display: 'flex'
  }
};
const CircleButton = ({ icon, style }) => {
  const combinedStyles = { ...styles, ...style };
  return <div style={combinedStyles} />;
};

export default CircleButton;
