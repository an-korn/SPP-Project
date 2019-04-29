import { formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from "prop-types";

import ProjectForm from 'src/components/ProjectForm';
import actions from 'src/actions';

const mapStateToProps = (state) => {
  const selector = formValueSelector('project');
  const projectInfo = selector(state, 'projectName')

  return {
    projectInfo,
    user: state.user.user,
    project: state.project.project
  }
}

class FormContainer extends React.Component {
  get projectInfo() {
    return this.props.projectInfo;
  }

  get body() {
  	return {name: this.projectInfo}
  }

  get update() {
    return this.props.update;
  }

  createProjectMutation = `
    mutation CreateProject($userId: ID!, $name: String!) {
      createProject(userId: $userId, name: $name) {
        id
        email
        projects {
          id
          name
        }
      }
    }
  `

  updateProjectMutation = `
    mutation UpdateProject($id: ID!, $name: String!) {
      updateProject(id: $id, name: $name) {
        id
        name
        stories {
          id
          description
          stage
        }
      }
    }
  `

  getProjectQuery = `
    query GetProject($id: ID!) {
      getProject(id: $id) {
        id
        name
        stories {
          id
          description
          stage
        }
      }
    }
  `

  updateProject() {
    this.props.updateProject(this.updateProjectMutation, this.props.project.id, this.body)
    this.props.getProject(this.getProjectQuery, this.props.project.id)
    this.props.onClose();
  }

  createProject() {
    this.props.createProject(this.createProjectMutation, this.props.user.id, this.body)
    this.props.getProject(this.getProjectQuery, this.props.project.id)
    this.props.onClose();
  }

  onProjectSubmit = () => {
  	return this.update? this.updateProject() : this.createProject();
  }

  render() {
  	return(
      <div>
  	    <ProjectForm update={this.update} onSubmit={this.onProjectSubmit} />
      </div>
  	)
  }
}

export default connect(
  mapStateToProps,
  actions
)(FormContainer);
