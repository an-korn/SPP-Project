import { formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import axios from 'axios';

import OrganizationForm from 'src/components/OrganizationForm';

const mapStateToProps = (state) => {
  const selector = formValueSelector('organization');
  const organization = selector(state, 'organizationName', 'domain')

  return {
    organization
  }
}

class FormContainer extends React.Component {
  get organization() {
    return this.props.organization;
  }

  get body() {
  	return {organization: this.organization }
  }

  onOrganizationSubmit = () => {
  	axios.post(`${process.env.REACT_APP_API_URL}/organizations`, this.body)
	  .then(response => {
        //this.props.addOrganization(response.data)
	  })
	  .catch(function (error) {
	    window.alert(error.response.data.errors);
	  });
  }

  render() {
  	return(
      <div>
  	    <OrganizationForm onSubmit={this.onOrganizationSubmit} update={this.updateOrganization} />
      </div>
  	)
  }
}

export default connect(
  mapStateToProps
)(FormContainer);
