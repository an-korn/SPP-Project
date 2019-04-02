import React from 'react'
import { Field, reduxForm } from 'redux-form'

const OrganizationForm = props => {
  const { handleSubmit, pristine, submitting } = props
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
        <label>Domain</label>
        <div>
          <Field
            name="domain"
            component="input"
            type="text"
            placeholder="Organization domain"
          />
        </div>
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>
          Add Organization
        </button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'organization'
})(OrganizationForm)