import React from 'react';
import { inject, observer } from 'mobx-react';
import { action } from 'mobx';
import '../styles/future.scss';

const Study = observer(({
  study,
  imageClassName,
  image,
  extendStudy,
  descStyle,
  studyClassName
}) => (
  <div className={studyClassName}>
    <span className="name">{study.name}</span>
    <span className="description" style={descStyle}>
      {study.description}
    </span>
    <div className="extend-container">
      <img
        className={imageClassName}
        alt="loading"
        role="button"
        src={image}
        onClick={() => extendStudy(study)}
      />
    </div>
  </div>
));

const FutureStudy = observer(({ study, extendStudy }) => {
  const image = !study.extend
    ? '../assets/svg/icon-arrow.svg'
    : '../assets/svg/timeline-dot-collapse.svg';
  const descStyle = study.extend ? {} : { display: 'none' };
  const imageClassName = study.extend ? 'extend-icon-extended' : 'extend-icon';
  return (
    <div className="future-study-wrapper">
      <div className="study-wrapper">
        <Study
          studyClassName="study study-left"
          study={study}
          descStyle={descStyle}
          imageClassName={imageClassName}
          image={image}
          extendStudy={extendStudy}
        />
        <div className="inner-separator">
          <div className="inner">
            <div className="radius" />
          </div>
        </div>
        <Study
          study={study}
          studyClassName="study study-right"
          descStyle={descStyle}
          imageClassName={imageClassName}
          image={image}
          extendStudy={extendStudy}
        />
      </div>
    </div>
  );
});

@inject('store')
@observer
class FutureStudyTimeLine extends React.Component {
  constructor(props) {
    super(props);
    this.state = { rotate: false, toggle: false };
  }
  componentDidMount() {
    const elm = this.image;
    elm.addEventListener('animationend', this.rotatingDone);
  }
  componentWillUnmount() {
    const elm = this.image;
    elm.removeEventListener('animationend', this.rotatingDone);
  }
  @action.bound rotatingDone() {
    this.setState(state => ({
      toggle: !state.toggle,
      rotate: false
    }));
    this.props.store.futureStudies.extend = !this.props.store.futureStudies
      .extend;
  }
  @action.bound extendStudy(study) {
    study.extend = !study.extend;
  }
  render() {
    const { store } = this.props;
    const { futureStudies } = store;
    const { extend } = futureStudies;
    const imageClassName = this.state.rotate ? 'image rotate' : 'image';
    return (
      <div className="future-study-container">
        <div className="separator">
          <span className="label">Future</span>
          <img
            className={imageClassName}
            alt="loading"
            ref={e => this.image = e}
            src="../assets/svg/icon-arrow.svg"
            role="button"
            onClick={() => {
              this.setState({ rotate: true });
            }}
          />
          <span className="label" />
        </div>
        <div className="left">
          <div className="studies">
            {extend &&
              futureStudies.studies.map(study => (
                <FutureStudy
                  key={study.id}
                  study={study}
                  extendStudy={this.extendStudy}
                />
              ))}
          </div>
        </div>

      </div>
    );
  }
}

export default FutureStudyTimeLine;
