import React from 'react'
import { Field, reduxForm } from 'redux-form'

const OrganizationForm = props => {
  const { handleSubmit, pristine, reset, submitting, update, exist } = props
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Organization Name</label>
        <div>
          <Field
            name="organizationName"
            component="input"
            type="text"
            placeholder="Organization Name"
          />
        </div>
      </div>
      <div>
        <label>Owner Email</label>
        <div>
          <Field
            name="email"
            component="input"
            type="email"
            placeholder="Email"
          />
        </div>
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={update}>
          Update
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'organization' // a unique identifier for this form
})(OrganizationForm)