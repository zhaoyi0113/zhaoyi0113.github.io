import React from 'react';
import { inject, observer, PropTypes } from 'mobx-react';
import { action } from 'mobx';
import SeeMoreButton from './SeeMoreButton';

export const MasterCommerce = () => (
  <div className="master-commerce-container">
    <div className="label">
      <span>YOU HAVE </span><span> 4 SUGGESTIONS</span>
    </div>
    <div className="information">
      <span>Master of Commerce</span>
      <div className="vertical-separator" />
      <span>2 years full-time or part-time equivalent</span>
      <SeeMoreButton />
    </div>
  </div>
);

/**
 * patient information component
 */
@observer class PersonInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editable: false };
  }
  @action.bound updateUserName(e) {
    this.props.userInfo.name = e.target.value;
  }

  @action.bound handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.setState({ editable: false });
    }
  }
  render() {
    const { userInfo } = this.props;
    return (
      <div className="person-information-container">
        <img className="person-image" src={userInfo.image} alt="Loading" />
        <div className="person-information">
          <input
            className="person-name"
            value={userInfo.name}
            readOnly={!this.state.editable}
            onChange={this.updateUserName}
            onKeyPress={this.handleKeyPress}
          />
          <img
            className="edit-icon"
            src="../../assets/svg/icon-edit.svg"
            alt="Loading"
            role="button"
            onClick={() => this.setState({ editable: !this.state.editable })}
          />
          <div className="person-title">{userInfo.title}</div>
          <div className="location-container">
            <span>{userInfo.college}</span>
            <img
              className="location-icon"
              src="../../assets/svg/icon-location.svg"
            />
            <span>{userInfo.location}</span>
          </div>
        </div>
      </div>
    );
  }
}
PersonInformation.propTypes = {
  userInfo: PropTypes.observableObject.isRequired
};

/**
 * the web page title component
 */
@inject('store')
@observer
class TitleContainer extends React.Component {
  render() {
    const { store } = this.props;
    return (
      <div className="title-container">
        <MasterCommerce />
        <PersonInformation userInfo={store.userInfo} />
        <div className="timeline">TIMELINE</div>
      </div>
    );
  }
}

export default TitleContainer;
