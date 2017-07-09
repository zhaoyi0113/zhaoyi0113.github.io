import React, {Component} from 'react';

const Header = ({title}) => (
  <div className="header" style={styles.header} >
    {title}
  </div>
);

export default class ProfileList extends Component {

  render() {
    return (
      <div className="profile-list" style={styles.root}>
        <Header />
      </div>
    );
  }
}

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  header: {

  }
};
