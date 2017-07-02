import React from 'react';
import ReactTooltip from 'react-tooltip';

const capabilities = [
  [
    {
      id: 1,
      name: 'nodejs',
      image: '../assets/img/nodejs-icon.svg'
    },
    {
      id: 2,
      name: 'java',
      image: '../assets/img/java-logo-vector.png'
    },
    {
      id: 3,
      name: 'MongoDB',
      image: '../assets/img/mongo-icon.png'
    },
    {
      id: 4,
      name: 'Spring Framework',
      image: '../assets/img/spring-icon.png'
    },
    {
      id: 5,
      name: 'Docker',
      image: '../assets/img/docker-icon.svg'
    },
    {
      id: 6,
      name: 'Javascript',
      image: '../assets/img/javascript-icon.png'
    },
    {
      id: 7,
      name: 'ES6',
      image: '../assets/img/es6-icon.png'
    },
    {
      id: 8,
      name: 'Webpack',
      image: '../assets/img/webpack-icon.png'
    }
  ],
  [
    {
      id: 9,
      name: 'ReactJS',
      image: '../assets/img/react-icon.png'
    },
    {
      id: 10,
      name: 'Redux',
      image: '../assets/img/logo-redux.png'
    },
    {
      id: 11,
      name: 'Github',
      image: '../assets/img/git-logo.png'
    },
    {
      id: 12,
      name: 'Nginx',
      image: '../assets/img/Nginx-Logo.png'
    },
    {
      id: 13,
      name: 'Jenkins',
      image: '../assets/img/jenkins-logo.png'
    },
    {
      id: 14,
      name: 'Swift',
      image: '../assets/img/swift-logo.png'
    },
    {
      id: 15,
      name: 'Android',
      image: '../assets/img/android-logo.png'
    },
    {
      id: 16,
      name: 'Gradle',
      image: '../assets/img/gradle-logo.png'
    }
  ]
];

const DevCapability = () => (
  <div style={styles.root}>
    <div style={styles.title}> DEVELOPMENT CAPABILITIES </div>
    <div style={styles.capabilities}>
      {capabilities.map(caps => (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          {caps.map(capability => (
            <img
              style={{ margin: '10 20 10 20' }}
              className="mouse-hover-opacity mouse-hover-pointer"
              key={capability.id}
              alt=""
              src={capability.image}
              width="80"
              height="80"
              data-tip={capability.name}
            />
          ))}
        </div>
      ))}
    </div>
    <ReactTooltip />
  </div>
);

export default DevCapability;

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: 400
  },
  title: {
    fontSize: '20px',
    color: 'rgb(227,221,210)',
    lineHeight: '150px',
    width: '100%',
    textAlign: 'center',
    background: 'url(../assets/img/bg-footer-stripedc.png) center top repeat-x'
  },
  capabilities: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
    width: '80%',
    alignItems: 'center',
  }
};
