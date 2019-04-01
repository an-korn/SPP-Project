import React from 'react'
import { Field, reduxForm } from 'redux-form'

const UserForm = props => {
  const { handleSubmit, pristine, reset, submitting, update } = props
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>User Email</label>
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
  form: 'user' // a unique identifier for this form
})(UserForm)