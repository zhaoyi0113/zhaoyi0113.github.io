import React from 'react';
import ReactTooltip from 'react-tooltip';

const NavigationItem = ({icon, onClick, tooltip}) => {
  const style = {
    ...styles.navigationItem,
  };
  return (
    <div
      className="mouse-hover-pointer"
      data-tip={tooltip}
      style={style}
      onClick={onClick}
    >
      <img
        src={icon}
        width="30"
        height="30"
        alt="loading"
        style={{ margin: '10px 10px auto 10px'}}
      />
      <ReactTooltip />
    </div>
  );
};

const NavigationBar = ({navigationItems}) => (
  <div>
    {navigationItems.map (item => (
      <NavigationItem
        key={item.id}
        icon={item.icon}
        tooltip={item.name}
        onClick={item.onClick}
      />
    ))}
  </div>
);
export default NavigationBar;

const styles = {
  navigationItem: {
    width: 50,
    height: 50,
    backgroundColor: 'rgb(244,240,229)',
    marginBottom: 1
  }
};