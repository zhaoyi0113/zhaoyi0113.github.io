import React from 'react';
import ReactTooltip from 'react-tooltip';

const styles = {
  display: 'flex',
  width: 40,
  height: 40,
  borderRadius: '50%',
  backgroundColor: 'rgb(16,165,135)',
  margin: '0 10px 0 10px'
};
const CircleButton = ({ icon, style, name, link }) => {
  const combinedStyles = { ...styles, ...style };
  return (
    <div
      className="mouse-hover-pointer"
      style={combinedStyles}
      onClick={() => window.location.assign(link)}
    >
      <img alt="" src={icon} width="40" height="40" data-tip={name} />
      <ReactTooltip />
    </div>
  );
};

export default CircleButton;
