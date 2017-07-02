import React from 'react';
import { inject, observer } from 'mobx-react';

const Project = ({ project }) => (
<div className="project" style={styles.project} >
  <img src={project.image} height="332" width="auto" />
</div>);

@inject('store')
@observer
class RecentProjects extends React.Component {
  render() {
    const { recentProjects } = this.props.store;
    return (
      <div className="recent-projects" style={styles.root}>
        <div style={styles.header}>Recent Projects</div>
        <div className="projects-list" style={styles.projectsList}>
          {recentProjects.map(project => (
            <Project key={project.id} project={project} />
          ))}
        </div>
      </div>
    );
  }
}
export default RecentProjects;

const styles = {
  root: {
    borderTop: '1px solid rgb(96,88,88)',
    background: "url('../assets/img/bg-footer-stripedc.png') 0 2px repeat-x",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  header: {
    marginTop: 40,
    color: 'white',
    fontSize: '35px',
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    paddingTop: '30px'
  },
  projectsList: {
    display: 'flex',
    flexDirection: 'row'
  },
  project: {
    display: 'flex',
    margin: '10px',
  }
};
