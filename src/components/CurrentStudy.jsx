import React from 'react';
import { observer } from 'mobx-react';
import Study from './Study';
/**
 * current study panel
 */
const CurrentStudy = observer(({
  currentStudy,
  extend,
  previousStudyNumber
}) => {
  const top = extend ? 420 + 213 * previousStudyNumber : 570;
  return (
    <div className="current-study-container">
      <div className="left">
        <span className="label"> Current </span>
        {' '}
        <Study study={currentStudy} />
        {' '}
      </div> <div className="next-step" style={{ top }}>
        <span> Next <br /> Steps </span>{' '}
      </div> <div className="separator-circle">
        <img alt="loading" src="../../assets/svg/timeline-dot-open.svg" />
      </div>{' '}
    </div>
  );
});

export default CurrentStudy;
