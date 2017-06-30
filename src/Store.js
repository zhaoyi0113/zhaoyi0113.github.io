import { observable } from 'mobx';
import randomWords from 'random-words';

export default class Store {
  @observable navigationItems = observable([{
    id: 0,
    icon: '../assets/img/nav-work-charcoal@2x.png',
    link: ''
  }, {
    id: 1,
    icon: '../assets/img/nav-about-charcoal@2x.png',
    link: ''
  }, {
    id: 2,
    icon: '../assets/img/nav-blog-charcoal@2x.png',
    link: ''
  }, {
    id: 3,
    icon: '../assets/img/nav-contact-charcoal@2x.png',
    link: ''
  }]);

  @observable userInfo = observable({
    name: 'Alex Harris',
    title: 'Student, Bachelor of Business',
    image: '../../assets/img/img-user.png',
    college: 'Swinburne University of Technology',
    location: 'Melbourne - Australia'
  });

  @observable dreamJob = observable({
    job: 'CEO/Managing Directory'
  });
  @observable previousStudies = observable({
    extend: false,
    studies: [{
        id: 0,
        name: 'Bachelor of Commerce',
        college: 'Swinburne University of Technology',
        date: '2016 - 2017',
        icon: '../../assets/img/icon-swinburne-university.png'
      },
      {
        id: 1,
        name: 'Certificate in Commerce',
        college: 'Swinburne University of Technology',
        date: '2014 - 2015',
        icon: '../../assets/img/icon-swinburne-university.png'
      },
      {
        id: 2,
        name: 'Diploma of Commerce',
        college: 'Swinburne University of Technology',
        date: '2015 - 2016',
        icon: '../../assets/img/icon-swinburne-university.png'
      }
    ]
  });

  @observable currentStudy = observable({
    id: 0,
    name: 'Bachelor of Commerce',
    college: 'Swinburne University of Technology',
    date: '2017 - 2018',
    icon: '../../assets/img/icon-swinburne-university.png'
  });

  @observable futureStudies = observable({
    extend: false,
    studies: [{
        id: 0,
        name: 'Learn a second language',
        description: randomWords(50).join(' '),
        extend: false,
        title: 'Manager',
      },
      {
        id: 1,
        name: 'MBA',
        description: randomWords(50).join(' '),
        extend: false,
        title: 'Senior Mangaer'

      }
    ]
  });
}