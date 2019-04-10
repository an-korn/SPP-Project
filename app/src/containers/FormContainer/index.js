import { formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import axios from 'axios';

import ProjectForm from 'src/components/ProjectForm';

const mapStateToProps = (state) => {
  const selector = formValueSelector('project');
  const project = selector(state, 'projectName')

  return {
    project
  }
}

const mapDispatchToProps = dispatch => ({
  updateProject: (project) => dispatch({ type: 'UPDATE_PROJECT', project: project }),
  createProject: (project) => dispatch({type: 'ADD_PROJECT', project: project})
})

class FormContainer extends React.Component {
  get project() {
    return this.props.project;
  }

  get body() {
  	return {project: this.project, user: this.props.user }
  }

  get update() {
    return this.props.update;
  }

  createProject = () => {
    axios.post(`http://localhost:3001/api/v1/project`, this.body)
      .then(response => {
        this.props.createProject(response.data);
        this.props.onClose();
      })
      .catch(function (error) {
        window.alert(error.response.data.errors);
      });
  }

  updateProject = () => {
    axios.put(`http://localhost:3001/api/v1/project/${this.props.project_id}`, this.body)
      .then(response => {
        this.props.updateProject(response.data);
        this.props.onClose();
      })
      .catch(function (error) {
        window.alert(error.response.data.errors);
      });
  }

  onProjectSubmit = () => {
  	return this.update ? this.updateProject() : this.createProject();
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
  mapDispatchToProps
)(FormContainer);
