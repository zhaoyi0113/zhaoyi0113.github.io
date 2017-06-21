import React from 'react';
import { observer } from 'mobx-react';
import SeeMoreButton from './SeeMoreButton';

const Step = ({ study }) => (
  <div className="step-container">
    <div className="step-name">
      <div className="info">
        <span className="name">{study.name}</span>
        <span className="description">{study.description}</span>
      </div>
      <SeeMoreButton style={{ height: '29px', width: '84px' }} />
    </div>
    <div className="footer">
      <img
        alt="Loading"
        width="8"
        height="14"
        src="../assets/svg/icon-arrow.svg"
      />
    </div>
  </div>
);

const NextStep = observer(({ nextStep }) => {
  const { studies } = nextStep;
  return (
    <div className="next-step-container">
      <div className="left">
        <Step study={studies[0]} />
      </div>
      <div className="separator">
        <div className="line" />
        <img
          alt="loading"
          src="../assets/svg/timeline-dot-next.svg"
          width="28"
          height="28"
        />
      </div>
      <div className="right">
        <Step study={studies[1]} />
      </div>
    </div>
  );
});

export default NextStep;
