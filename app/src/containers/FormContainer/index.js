import { formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from "prop-types";

import ProjectForm from 'src/components/ProjectForm';
import actions from 'src/actions';

const mapStateToProps = (state) => {
  const selector = formValueSelector('project');
  const project = selector(state, 'projectName')

  return {
    project
  }
}

class FormContainer extends React.Component {
  callback(data, props) {
    props.getProjects(props.user)
    props.getProject(data.id);
    props.onClose();
  }

  componentWillMount() {
    this.props.subscribeСreateProject(this.callback, this.props);
    this.props.subscribeUpdateProject(this.callback, this.props);
  }

  get project() {
    return this.props.project;
  }

  get body() {
  	return {project: this.project, user: this.props.user }
  }

  get update() {
    return this.props.update;
  }

  onProjectSubmit = () => {
  	return this.update? this.props.updateProject(this.props.project_id, this.body) : this.props.createProject(this.body);
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
