import { formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import axios from 'axios';

import OrganizationForm from 'src/components/OrganizationForm';
import UserForm from 'src/components/UserForm'

const mapStateToProps = (state) => {
  const organizationForUpdate = state.organization.organization
  const selector = formValueSelector('organization');
  const organization = selector(state, 'organizationName', 'email')
  const userSelector = formValueSelector('user');
  const user = userSelector(state, 'email')

  return {
    user,
    organization,
    organizationForUpdate
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addOrganization: organization => {
      dispatch({
        type: 'ADD_ORGANIZATION',
        organization: organization
      })
    },
    updateOrganization: organization => {
      dispatch({
        type: 'UPDATE_ORGANIZATION',
        organization: organization
      })
    },
    addUser: user => {
      dispatch({
        type: 'ADD_USER',
        user: user
      })
    },
    updateUser: user => {
      dispatch({
        type: 'UPDATE_USER',
        user: user
      })
    }
  }
}

class FormContainer extends React.Component {
  get organization() {
    return this.props.organization;
  }

  get user(){
    return this.props.user;
  }

  get orgBody() {
  	return {organization: this.organization }
  }

  get userBody() {
    return {user: this.user }
  }

  updateOrganization = () => {
    axios.put(`${process.env.REACT_APP_API_URL}/organization/${this.props.organizationForUpdate.id}`, this.orgBody)
	  .then(response => {
      this.props.updateOrganization(response.data)
	  })
	  .catch(function (error) {
	  	window.alert(error.response.data.errors);
	  });
  }

  onOrganizationSubmit = () => {
  	axios.post(`${process.env.REACT_APP_API_URL}/organizations`, this.orgBody)
	  .then(response => {
        this.props.addOrganization(response.data)
	  })
	  .catch(function (error) {
	    window.alert(error.response.data.errors);
	  });
  }

  updateUser = () => {
    axios.put(`${process.env.REACT_APP_API_URL}/user/${this.props.organizationForUpdate.id}`, this.userBody)
    .then(response => {
      //this.props.updateOrganization(response.data)
    })
    .catch(function (error) {
      window.alert(error.response.data.errors);
    });
  }

  onUserSubmit = () => {
    axios.post(`${process.env.REACT_APP_API_URL}/users`, this.userBody)
    .then(response => {
      console.log(response);
      this.props.addUser(response.data)
    })
    .catch(function (error) {
      window.alert(error.response.data.errors);
    });
  }

  render() {
  	return(
      <div>
  	    <OrganizationForm onSubmit={this.onOrganizationSubmit} update={this.updateOrganization} />
        <UserForm onSubmit={this.onUserSubmit} update={this.updateUser} />
      </div>
  	)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormContainer);
