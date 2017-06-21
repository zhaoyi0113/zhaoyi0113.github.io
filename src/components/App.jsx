import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import '../styles/app.scss';
import '../../fonts/font-roboto.scss';
import Header from './Header';
import TitleContainer, { MasterCommerce } from './TitleContainer';
import TimelineContainer from './Timeline';
import FutureStudyTimeLine from './FutureStudies';
import DreamJobContainer from './DreamJob';
import FooterContainer from './Footer';

@inject('store')
@observer
export default class App extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        <TitleContainer />
        <TimelineContainer />
        <FutureStudyTimeLine />
        <DreamJobContainer />
        <MasterCommerce />
        <FooterContainer />
      </div>
    );
  }
}
