import React from 'react';
import { observer, PropTypes } from 'mobx-react';
import { action } from 'mobx';
/**
 * the Study component render the milestone on the timeline
 */
@observer class Study extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editable: false };
  }
  @action.bound updateStudyName(e) {
    this.props.study.name = e.target.value;
  }
  @action.bound handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.setState({ editable: false });
    }
  }
  render() {
    const study = this.props.study;
    return (
      <div style={{ display: 'flex' }}>
        <div className="study-container">
          <div className="college-info">
            <img className="college-icon" src={study.icon} alt="loading" />
            <div className="college-details">
              <input
                type="text"
                className="study-name"
                readOnly={!this.state.editable}
                value={study.name}
                onChange={this.updateStudyName}
                onKeyPress={this.handleKeyPress}
              />
              <span className="college-name">{study.college}</span>
              <span className="study-date">{study.date}</span>
            </div>
            <img
              className="edit-icon"
              alt="loading"
              role="button"
              src="../../assets/svg/icon-edit.svg"
              onClick={() => this.setState({ editable: !this.state.editable })}
            />
          </div>
          <div className="study-footer">
            <img alt="Loading" src="../../assets/svg/icon-arrow.svg" />
          </div>
        </div>
        <div className="arrow" />
      </div>
    );
  }
}
Study.propTypes = {
  study: PropTypes.observableObject.isRequired
};
export default Study;
