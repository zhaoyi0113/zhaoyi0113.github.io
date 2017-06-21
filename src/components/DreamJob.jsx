import React from 'react';
import { inject, observer } from 'mobx-react';

@inject('store')
@observer
class DreamJobContainer extends React.Component {
  render() {
    const { store } = this.props;
    return (
      <div className="dreamjob-container">
        <span className="label">Your dream job is:</span>
        <div className="dream-job-container">
          <span className="dream-job">{store.dreamJob.job}</span>
          <img className="icon" src="../../assets/svg/icon-arrow.svg" />
        </div>
      </div>
    );
  }
}

export default DreamJobContainer;
