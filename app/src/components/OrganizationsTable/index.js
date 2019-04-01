import OrganizationInfo from 'src/components/OrganizationInfo'

const OrganizationsTable = props => {
	return pug`
	  .wrapper
	    p Organizations:

	    for organization, key in props.organizations
	      span(key=key)= OrganizationInfo(organization)
	`
}

export default OrganizationsTable
