import { observable } from 'mobx';
import randomWords from 'random-words';

export default class Store {
  @observable navigationItems = observable([{
      id: 0,
      icon: '../assets/img/nav-work-charcoal@2x.png',
      link: ''
    },
    {
      id: 1,
      icon: '../assets/img/nav-about-charcoal@2x.png',
      link: ''
    },
    {
      id: 2,
      icon: '../assets/img/nav-blog-charcoal@2x.png',
      link: ''
    },
    {
      id: 3,
      icon: '../assets/img/nav-contact-charcoal@2x.png',
      link: ''
    }
  ]);

  @observable userInfo = observable({
    name: 'Zhao Yi',
    title: 'Student, Bachelor of Business',
    image: '../../assets/img/img-user.png',
    college: 'Swinburne University of Technology',
    location: 'Melbourne - Australia'
  });

  @observable recentProjects = observable([{
    id: 1,
    name: 'NurseGo',
    image: '../assets/img/nursego.jpg',
    link: 'https://itunes.apple.com/us/app/%E6%8A%A4%E5%A3%AB%E8%AF%B4/id1109289769?ls=1&mt=8'
  }, {
    id: 2,
    name: 'Go2Nurse-Nurse',
    image: '../assets/img/go2nurse-nurse.jpg',
    link: 'https://itunes.apple.com/us/app/%E5%85%A8%E6%97%B6%E6%8A%A4%E7%90%86%E6%8A%A4%E5%A3%AB%E7%AB%AF/id1181853557?ls=1&mt=8',
  }, {
    id: 3,
    name: 'dbKoda',
    image: '../assets/img/dbkoda.png',
    link: 'https://www.dbkoda.com',
  }, {
    id: 4,
    name: 'JiMi',
    image: '../assets/img/jimi.jpeg',
    link: 'https://itunes.apple.com/us/app/%E6%9E%81%E5%AF%86/id1071807507?mt=8',
  }, {
    id: 5,
    name: 'Go2Nurse-Nurse',
    image: '../assets/img/go2nurse-patient.jpg',
    link: 'https://itunes.apple.com/us/app/%E5%85%A8%E6%97%B6%E6%8A%A4%E7%90%86/id1130933950?ls=1&mt=8',
  }, {
    id: 6,
    name: 'PatientCases',
    image: '../assets/img/patient-case.jpg',
    link: 'https://itunes.apple.com/us/app/%E6%82%A3%E8%80%85%E7%97%85%E4%BE%8B%E7%AE%A1%E7%90%86/id1219892823?ls=1&mt=8',
  }]);
}