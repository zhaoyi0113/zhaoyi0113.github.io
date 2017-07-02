import React from 'react';
import '../styles/user-info.scss';

const User = ({ userInfo }) => (
  <div style={ styles.userInfo.inner }>
    <div style={styles.header}>
      <div style={{ marginTop: 5 }}>full stack developer</div>
    </div>
    <div style={styles.name}>
      {userInfo.name}
    </div>
    <div style={styles.footer}>
      <div style={{ marginBottom: 5 }}>lots to see here</div>
    </div>
    <div style={styles.arrow} />
  </div>
);

const ShowMore = () => (
  <div className="user-info-show-more" style={styles.userInfo.inner}>
    <div style={styles.showMore.text}>
      <div>What are you</div>
      <div>waiting for?</div>
    </div>
    <div style={{ ...styles.arrow, height: 60 }} />
  </div>
);

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showMore: false };
  }
  render() {
    const { userInfo } = this.props;
    return (
      <div
        style={styles.userInfo}
        onMouseEnter={() => {
          this.setState({ showMore: true });
        }}
        onMouseLeave={() => {
          this.setState({ showMore: false });
        }}
      >
        {this.state.showMore ? <ShowMore /> : <User userInfo={userInfo} />}
      </div>
    );
  }
}

export default UserInfo;

const styles = {
  userInfo: {
    width: 300,
    height: 300,
    margin: 'auto',
    backgroundColor: 'rgb(16,165,135)',
    borderRadius: '50%',
    inner: {
      borderRadius: '50%',
      borderColor: 'white',
      borderWidth: '1px',
      borderStyle: 'solid',
      height: '95%',
      width: '95%',
      margin: '7.5px',
      display: 'flex',
      flexDirection: 'column'
    }
  },
  header: {
    width: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '40px',
    borderColor: 'transparent',
    borderTopColor: 'white',
    borderStyle: 'solid',
    borderWidth: 1,
    textAlign: 'center',
    color: 'white'
  },
  name: {
    color: 'rgb(139,237,219)',
    textAlign: 'center',
    lineHeight: '100px',
    fontSize: '50px'
  },
  footer: {
    width: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderColor: 'transparent',
    borderBottomColor: 'white',
    borderStyle: 'solid',
    borderWidth: 1,
    textAlign: 'center',
    color: 'white'
  },
  arrow: {
    background: 'url("../assets/img/h-arrow.png") center bottom no-repeat',
    margin: 'auto',
    width: 10,
    height: 40
  },

  showMore: {
    text: {
      margin: '50px auto 0 auto',
      color: 'rgb(139,237,219)',
      fontFamily: 'cursive',
      fontSize: '30px'
    }
  }
};
