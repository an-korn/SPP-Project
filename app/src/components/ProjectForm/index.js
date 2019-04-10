import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import injectSheet from "react-jss";
import { compose } from 'redux';

import styles from "./styles";

const ProjectForm = props => {
  const { handleSubmit, pristine, submitting, classes, update } = props
  return (
    <form onSubmit={handleSubmit}>
      <div className={classes.div}>
        {update ?
          <h2>Update Project</h2> :
          <h2>Create new Project</h2>}
        <div>
          <Field
            name="projectName"
            component="input"
            type="text"
            placeholder="Project Name"
          />
        </div>
      </div>
      <div className={classes.div}>
        <button type="submit" disabled={pristine || submitting}>
          {update ? <span>Update Project</span> : <span>Add Project</span>}
        </button>
      </div>
    </form>
  )
}

export default compose(
  reduxForm({
    form: 'project'
  }),
  injectSheet(styles)
)(ProjectForm);