import React from 'react';

const styles = {
  height: '33px',
  width: '123px',
  lineHeight: '33px',
  margin: '7px 5px',
  color: 'white',
  textAlign: 'center',
  backgroundColor: 'rgb(239, 112, 75)',
  maxWidth: '123px',
  marginLeft: 'auto',
  fontSize: '14px',
  fontFamily: 'Roboto-Bold'
};
/**
 * this is the component for SEE MORE button
 */
const SeeMoreButton = ({ text = 'SEE MORE', style }) => {
  const finalStyles = { ...styles, ...style };
  return <div className="see-more-button" style={finalStyles}>{text}</div>;
};

export default SeeMoreButton;
