import React, {Component} from 'react';
import _ from 'lodash';
import {inject, observer} from 'mobx-react';
import '../styles/app.scss';
import NavigationBar from './NavigationBar';

const Header = ({title}) => (
  <div className="project-header" style={styles.header}>
    {title}
  </div>
);

const Type = ({type}) => <div style={styles.type}> - {type} - </div>;

const ProjectNotes = ({project}) => (
  <aside style={styles.projectNotes}>
    <div style={{backgroundColor: 'white', height: '100%', marginLeft: 17}}>
      <div style={styles.projectNotes.header}> PROJECT NOTES </div>
      <div style={styles.projectNotes.notes}>{project.description}</div>
      <div style={styles.projectNotes.tech}> {project.tech} </div>
    </div>
  </aside>
);

const Project = ({project}) => (
  <div style={styles.project}>
    <Header title={project.name} />
    <Type type={project.type} />
    <div
      style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}
    >
      {project.images.map ((image, i) => {
        const id = i;
        return <img key={id} style={styles.project.image} src={image} />;
      })}
    </div>
    <ProjectNotes project={project} />
  </div>
);

@inject ('store')
@observer
export default class ProfileList extends Component {
  constructor (props) {
    super (props);
    this.state = {page: 0};
  }

  render () {
    const {recentProjects} = this.props.store;
    const project = _.filter (
      recentProjects,
      o => o.id == this.props.params.id
    )[0];
    return (
      <div className="profile-list" style={styles.root}>
        <div style={{position: 'absolute', left: '200px', top: '100px',}}>
          <NavigationBar navigationItems={this.props.store.navigationItems} />
        </div>
        <Project project={project} />
      </div>
    );
  }
}

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    margin: 'auto',
    backgroundImage: 'url(../assets/img/bg-sketches.jpg',
  },
  project: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'rgb(235,230,218)',
    width: '800px',
    image: {
      width: '80%',
      margin: '30px 0 50px 0',
    },
  },
  header: {
    height: 70,
    textAlign: 'center',
    marginTop: 70,
    borderBottom: '1px rgb(224,214,186) solid',
    fontSize: '3em',
  },
  type: {
    backgroundColor: 'rgb(185,179,158)',
    borderTop: '1px solid rgb(244,240,229)',
    color: 'white',
    textAlign: 'center',
  },
  projectNotes: {
    width: '90%',
    alignSelf: 'center',
    backgroundImage: 'url(../assets/img/note-edge.png)',
    backgroundRepeat: 'no-repeat',
    height: 200,
    display: 'flex',
    flexDirection: 'column',
    header: {
      alignSelf: 'center',
      // backgroundColor: 'white',
      paddingTop: '10px',
      height: 30,
      fontSize: '1.2em',
      fontFamily: 'brandon_gro_blackRg, MuseoSans-900, helvetica, arial, sans-serif;',
      // width: '100%',
      textAlign: 'center',
      marginLeft: 17,
      borderBottom: '1px solid rgb(226,215,189)',
      fontWeight: 'bold',
    },
    notes: {
      marginLeft: 17,
      paddingTop: 10,
      // backgroundColor: 'white',
      // height: '75%',
      paddingLeft: 10,
      color: 'gray',
    },
    tech: {
      marginLeft: 17,
      paddingTop: 10,
      paddingLeft: 10,
      color: 'gray',
    },
  },
};
