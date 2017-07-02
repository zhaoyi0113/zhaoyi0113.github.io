import React from 'react';
import { inject, observer } from 'mobx-react';

const Project = ({ project, onMouseEnter, onMouseLeave, className, style }) => (
  <div
    className={`project ${className}`}
    style={style}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    <img src={project.image} height="332" width="auto" />
  </div>
);

@inject('store')
@observer
class RecentProjects extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hoverId: 0 };
  }
  render() {
    const { recentProjects } = this.props.store;
    return (
      <div className="recent-projects" style={styles.root}>
        <div style={styles.header}>Recent Projects</div>
        <div className="projects-list" style={styles.projectsList}>
          {recentProjects.map(project => {
            const style = { ...styles.project };
            let className = '';
            if (project.id === this.state.hoverId) {
              style.opacity = 0.5;
              className = 'mouse-hover-pointer';
            }
            return (
              <Project
                key={project.id}
                project={project}
                style={style}
                className={className}
                onMouseEnter={() => {
                  this.setState({ hoverId: project.id });
                }}
                onMouseLeave={() => {
                  this.setState({ hoverId: 0 });
                }}
              />
            );
          })}
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
    margin: '10px'
  }
};
