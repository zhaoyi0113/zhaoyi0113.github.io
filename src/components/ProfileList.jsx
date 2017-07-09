import React, {Component} from 'react';
import _ from 'lodash';
import {inject, observer} from 'mobx-react';
import '../styles/app.scss';

const Header = ({title}) => (
  <div className="project-header" style={styles.header}>
    {title}
  </div>
);

const Type = ({type}) => <div style={styles.type}> - {type} - </div>;

const ProjectNotes = ({project}) => (
  <aside style={styles.projectNotes}>
    <div style={styles.projectNotes.notes}>{project.description}</div>
  </aside>
);

const Project = ({project}) => (
  <div style={styles.project}>
    <Header title={project.name} />
    <Type type={project.type} />
    <div
      style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}
    >
      {project.images.map (image => {
        return <img style={styles.project.image} src={image} />;
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
    console.log (this.props.params.id);
    const project = _.filter (
      recentProjects,
      o => o.id == this.props.params.id
    )[0];
    console.log (project.images);
    return (
      <div className="profile-list" style={styles.root}>
        <Project project={project} />
      </div>
    );
  }
}

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'rgb(235,230,218)',
    width: '80%',
    margin: 'auto',
  },
  project: {
    display: 'flex',
    flexDirection: 'column',
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
    // backgroundColor: 'white',
    backgroundImage: 'url(../assets/img/note-edge.png)',
    backgroundRepeat: 'no-repeat',
    height: 200,
    marginBottom: 100,
    notes: {marginLeft: 17, backgroundColor: 'white', height:'100%', paddingLeft: 10}
  },
};
