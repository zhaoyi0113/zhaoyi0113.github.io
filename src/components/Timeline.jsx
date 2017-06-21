import React from 'react';
import { inject, observer, PropTypes } from 'mobx-react';
import { action } from 'mobx';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import CurrentStudy from './CurrentStudy';
import Study from './Study';
import NextStep from './NextStep';

const EducationExperience = () => (
  <div className="education-experience">
    <span>EDUCATION</span>
    <div className="separator" />
    <span>EXPERIENCE</span>
  </div>
);

@observer class PreviousStudyHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { rotate: false, toggle: false };
  }
  componentDidMount() {
    const elm = this.image;
    elm.addEventListener('animationend', this.rotatingDone.bind(this));
  }
  componentWillUnmount() {
    const elm = this.image;
    elm.removeEventListener('animationend', this.rotatingDone.bind(this));
  }
  @action.bound rotatingDone() {
    const { previousStudies } = this.props;
    this.setState(state => ({
      toggle: !state.toggle,
      rotate: false
    }));
    previousStudies.extend = !previousStudies.extend;
  }
  render() {
    const extend = this.props.previousStudies.extend;
    const icon = extend
      ? '../../assets/svg/timeline-dot-collapse.svg'
      : '../../assets/svg/icon-arrow.svg';
    let className = extend ? 'icon-arrow-rotate' : 'icon-arrow';
    if (this.state.rotate) {
      className += ' rotate';
    }
    return (
      <div className="previous-study">
        <span className="past">Past</span>
        <div>
          <img
            className={className}
            alt="Loading"
            ref={elm => this.image = elm}
            src={icon}
            role="button"
            onClick={action.bound(() => {
              this.setState({ rotate: true });
            })}
          />
        </div>
        <span className="previous">Previous studies and experience</span>
      </div>
    );
  }
}
PreviousStudyHeader.propTypes = {
  previousStudies: PropTypes.observableObject.isRequired
};

const PreviousStudiesDetail = observer(({ previousStudies }) => {
  const extend = previousStudies.extend;
  const studies = extend
    ? previousStudies.studies
    : previousStudies.studies.slice(0, 0);
  return (
    <div className="studies-container">
      <div className="left">
        {studies.map(study => <Study key={study.id} study={study} />)}
      </div>
      <div className="separator">
        {studies.map((study, i) => {
          let marginTop = 10 * (i + 1);
          if (i > 0) {
            if (i % 2 !== 0) {
              marginTop += 110;
            } else {
              marginTop += 100;
            }
          }
          return (
            <div
              className="separator-circle"
              style={{ marginTop }}
              key={study.id}
            >
              <img alt="loading" src="../../assets/svg/timeline-dot-open.svg" />
            </div>
          );
        })}
      </div>
    </div>
  );
});

@inject('store')
@observer
class TimelineContainer extends React.Component {
  render() {
    const { store } = this.props;
    return (
      <div className="timeline-container">
        <EducationExperience />
        <PreviousStudyHeader previousStudies={store.previousStudies} />
        <PreviousStudiesDetail previousStudies={store.previousStudies} />
        <CurrentStudy
          currentStudy={store.currentStudy}
          previousStudyNumber={store.previousStudies.studies.length}
          extend={store.previousStudies.extend}
        />
        <NextStep nextStep={store.nextStep} />
      </div>
    );
  }
}

export default TimelineContainer;
