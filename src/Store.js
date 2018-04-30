import { observable } from 'mobx';

export default class Store {
  @observable navigationItems = observable([{
      id: 0,
      icon: '../assets/img/nav-work-charcoal@2x.png',
      link: '/pl',
      name: 'WORK',
    },
    {
      id: 1,
      icon: '../assets/img/nav-about-charcoal@2x.png',
      link: '/',
      name: 'ABOUT',
    },
    {
      id: 2,
      icon: '../assets/img/nav-blog-charcoal@2x.png',
      link: '',
      name: 'BLOG',
      onClick: () => window.location.assign('https://medium.com/@zhaoyi0113'),
    },
    {
      id: 3,
      icon: '../assets/img/nav-contact-charcoal@2x.png',
      link: '',
      name: 'EMAIL',
      onClick: () => (window.location.href = 'mailto:zhaoyi0113@gmail.com'),
    },
  ]);

  @observable userInfo = observable({
    name: 'Zhao Yi, Joey',
    title: 'Student, Bachelor of Business',
    image: '../../assets/img/img-user.png',
    college: 'Swinburne University of Technology',
    location: 'Melbourne - Australia',
    blog: 'https://medium.com/@zhaoyi0113/',
  });

  @observable recentArticles = observable([{
      id: 1,
      title: 'MongoDB Explain: Multi-Key Index Analysis',
      description: 'When creating Index inside an array object in a document, the result is kind of hard to explain. Fortunately MongoDB provides us a good feather, explain allow us to look into the query execution stages. In this article, I am going to show how to use explain to analysis the execution details. Particularly, taking a multi-key index query as an example to illustrate how to examine the query condition.',
      link: 'https://medium.com/@zhaoyi0113/mongodb-explain-multi-key-index-analysis-b272cd569ecf',
    },
    {
      id: 2,
      title: 'R — Beginner: How to Data Set Variables for Categorical and Density',
      description: 'As a R beginner, instead of being shocked by R’s feathers and abilities, I am eager to put what I learnt into analysing the data in the real world. I recently got a data set from Kaggle House Prices and found out that this is a great chance for me to use my R skills for data analysing. As begin our journey.',
      link: 'https://medium.com/@zhaoyi0113/r-beginner-how-to-data-set-variables-for-categorical-and-density-ba7cf41dec89',

    },
    {
      id: 3,
      title: 'MongoDB Performance — Explain',
      description: 'When it comes to database design or analytic, query performance optimistic is always a hot topic. MongoDB provides a really great feather, which is “explain”, on helping DBAs to understand what’s going on inside the query command execution. After evaluating the explain, I have to say it is a really helpful and well-designed feather in terms of performance. In this article, I’d like discussing more in detailed about explain. It will help beginners on using it.',
      link: 'https://medium.com/@zhaoyi0113/how-to-use-explain-to-improvement-mongodb-performance-3adadb1228f1',
    },
    {
      id: 4,
      title: 'MongoDB的水平扩展，你做对了吗？',
      description: '当人们一开始使用数据库系统的时候，所有数据都是跑在一台服务器上，即所谓的单机数据库服务器。在企业级应用中，我们会搭建一台应用程序服务器，一般它会被运行在一台服务器或者工作站上，大多数情况下采用 Linux／Unix／Windows 操作系统，也有人把这样的服务器称之为应用程序服务器。顾名思义，他的作用是处理复杂的业务逻辑。但是一点需要注意的是，在这样的构架中，这台应用程序服务器不会存储任何业务数据...',
      link: 'http://www.infoq.com/cn/articles/scale-out-mongodb?utm_source=infoq&utm_campaign=user_page&utm_medium=link'
    },
    {
      id: 5,
      title: '如何将关系型数据导入MongoDB？',
      description: '今天一早就收到一封关于 MongoDB 的邮件，MongoDB began trading as a public company on the NASDAQ under the symbol “MDB.”。是的，在经过长达 10 多年的开发应用后，MongoDB 终于登上了纳斯达克。作为一个 MongoDB 的忠实粉丝，除了为它感到骄傲之外，还想在此整理一下最近工作中在 MongoDB 上的一些想法和经验。此文也算是为 MongoDB 的推广献一份力量。',
      link: 'http://www.infoq.com/cn/articles/migrate-from-rmdb-mongodb?utm_source=infoq&utm_campaign=user_page&utm_medium=link'
    },
    {
      id: 6,
      title: '如何通过MongoDB自带的Explain功能提高检索性能？',
      description: '每当大家谈到数据库检索性能的时候，首先提及的就是索引，对此，MongoDB 也不例外。就像大家读一本书，或者查字典一样，索引是书的目录，让你方便的能够在上百页的书中找到自己感兴趣的内容。那么，有多少人了解索引的底层原理呢？相信大部分人，至少与数据库打过交道的都知道如何使用，但是牵扯到底层的技术实现可能研究过的人就不多了...',
      link: 'http://www.infoq.com/cn/articles/improve-find-performance-in-mongo?utm_source=infoq&utm_campaign=user_page&utm_medium=link'
    },
    {
      id: 7,
      title: 'Python implementation of batch gradient descent',
      description: 'A brief introduction about python implementation of gradient descent',
      link: 'https://medium.com/@zhaoyi0113/python-implementation-of-batch-gradient-descent-379fa19eb428'
    }
  ]);

  @observable recentProjects = observable([
    {
      id: 100,
      name: 'The Big Crunch',
      type: 'Web Application',
      image: '../assets/projects/bigcrunch.png',
      images: ['../assets/projects/bigcrunch.png'],
      link: 'https://123456.bigcrunch.io/',
      description: 'The Big Crunch is a real-time interactive data publishing platform. It helps companies get the most out of the numerical-based information they are uploading to their websites by streamlining the process specifically for numbers, calculations and visualisations. That information can then be viewed, used, collaborated around, subscribed to, purchased, or built upon by others thus extending the reach and life of that data.',
      tech: 'Javascript, NodeJS, Elixir, Redis, Nginx, Rocksdb',
    },
    {
      id: 2,
      name: 'dbKoda',
      type: 'Electron Application',
      image: '../assets/img/dbkoda.png',
      link: 'https://www.dbkoda.com',
      images: ['../assets/projects/dbkoda-1.png',
        '../assets/projects/dbkoda-2.png',
        '../assets/projects/dbkoda-3.png',
        '../assets/projects/dbkoda-4.png',
      ],
      description: 'dbKoda is a rich MongoDB code editor with syntax highlighting, code completion, formatting and more. Graphical interface to MongoDB administration and query commands. Quickly switch between multiple MongoDB servers.',
      tech: 'NodeJS, FeathersJS, ReactJS, Mobx, MongoDB, Electron',
    },
    {
      id: 1,
      name: 'Go2Nurse',
      type: 'Mobile Application',
      image: '../assets/projects/cooltoo.png',
      link: 'http://www.cool-too.com/',
      description: 'This project is to build an Android and iOS App for patients to get services \
      from nurses.Hospital can publish their nursing services on this app and \
      patients can submit orders to purchase these nursing services.',
      images: [
        '../assets/projects/cooltoo.png',
        '../assets/projects/cooltoo-2.png',
        '../assets/projects/cooltoo-3.png',
      ],
      tech: 'Java SpringBoot ReactJS MySQL AWS',
    },
    {
      id: 3,
      name: 'JiMi',
      type: 'Mobile Application',
      image: '../assets/img/jimi.jpeg',
      images: ['../assets/projects/jimi-1.jpeg',
        '../assets/projects/jimi-2.jpeg',
        '../assets/projects/jimi-3.jpeg',
        '../assets/projects/jimi-4.jpeg',
      ],
      tech: 'Java, Spring, Tomcat, Android, Swift, MySQL',
      description: '“极密”是上海华瑞银行为用户提供的，用于存储个人重要信息的云平台。用户可以通过手机随时随地在自己的移动空间保存或查看重要的信息、文件、照片及视频，存储内容享有银行级安保防护，确保用户数字资产安全私密、仅自己可见',
      link: 'https://itunes.apple.com/us/app/%E6%9E%81%E5%AF%86/id1071807507?mt=8',
    }, {
      id: 4,
      name: 'NurseGo',
      type: 'Mobile Application',
      image: '../assets/img/nursego.jpg',
      images: ['../assets/projects/nursego-1.jpg',
        '../assets/projects/nursego-2.jpg',
        '../assets/projects/nursego-3.jpg'
      ],
      link: 'https://itunes.apple.com/us/app/%E6%8A%A4%E5%A3%AB%E8%AF%B4/id1109289769?ls=1&mt=8',
      tech: 'Java SpringBoot Swift2 MySQL ALiCloud',
      description: 'This project is to build an iOS social App for nurses. They can publish their photos, ideas, thinking throw the app and find friends from there.',
    },
    // {
    //   id: 5,
    //   name: 'Go2Nurse (Patient)',
    //   type: 'Mobile Application',
    //   image: '../assets/img/go2nurse-patient.jpg',
    //   images: [],
    //   link: 'https://itunes.apple.com/us/app/%E5%85%A8%E6%97%B6%E6%8A%A4%E7%90%86/id1130933950?ls=1&mt=8',
    // },
    // {
    //   id: 6,
    //   name: 'PatientCases',
    //   type: 'Mobile Application',
    //   image: '../assets/img/patient-case.jpg',
    //   images: [],
    //   link: 'https://itunes.apple.com/us/app/%E6%82%A3%E8%80%85%E7%97%85%E4%BE%8B%E7%AE%A1%E7%90%86/id1219892823?ls=1&mt=8',
    // },
  ]);
}