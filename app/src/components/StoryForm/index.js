import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import injectSheet from "react-jss";
import { compose } from 'redux';

import styles from "./styles";

const StoryForm = props => {
  const stages = ['New', 'In progress', 'Testing', 'Delivered']
  const { handleSubmit, pristine, submitting, classes, button, update } = props
  return (
    <form onSubmit={handleSubmit}>
      <div className={classes.div}>
        <label className={classes.label}>Description:</label>
        <div>
          <Field
            name="description"
            component="input"
            type="text"
          />
        </div>
      </div>
      {update && <div className={classes.div}>
              <label>#</label>
              <div>
                <Field
                  name="id"
                  component="input"
                  type="text"
                  disabled
                />
              </div>
            </div>}
      <div className={classes.div}>
        <label className={classes.label}>State:</label>
        <div>
          <Field name="stage" component="select">
            {stages.map(stage => (
              <option value={stage.toLowerCase()} key={stage}>
                {stage}
              </option>
            ))}
          </Field>
        </div>
      </div>
      <div className={classes.div}>
        <button type="submit" disabled={submitting}>
          <span>{button}</span>
        </button>
      </div>
    </form>
  )
}

export default compose(
  reduxForm({
    form: 'story'
  }),
  injectSheet(styles)
)(StoryForm);