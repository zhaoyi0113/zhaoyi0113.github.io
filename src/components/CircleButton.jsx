import React from 'react';

const styles = {
  display: 'flex',
  width: 40,
  height: 40,
  borderRadius: '50%',
  backgroundColor: 'rgb(16,165,135)',
};
const CircleButton = ({ icon, style }) => {
  const combinedStyles = { ...styles, ...style };
  return <div style={combinedStyles} />;
};

export default CircleButton;
