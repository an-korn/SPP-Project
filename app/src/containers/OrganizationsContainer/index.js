import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import OrganizationsTable from 'src/components/OrganizationsTable';

class OrganizationsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };
  }

  getOrganizations () {
    axios.get(`${process.env.REACT_APP_API_URL}/organizations.json`)
  	  .then(response => {
        response.data.forEach(organization => this.props.addOrganization(organization))
        this.setState({
          isLoading: false
        });
      })
  }

  componentDidMount() {
  	this.getOrganizations()
  }

  get isLoading() {
  	return this.state.isLoading
  }

  render() {
  	return (
  	  <div>
  	    {!this.isLoading && <OrganizationsTable organizations={this.props.organizations}/>}
  	  </div>
    )
  }
}

const mapStateToProps = ({ organization }) => {
  console.log(organization.organizations);
  return{
  organizations: organization.organizations,
}}

const mapDispatchToProps = dispatch => {
  return {
    addOrganization: organization => {
      dispatch({
        type: 'ADD_ORGANIZATION',
        organization: organization
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationsContainer)
