import { connect } from 'react-redux'

import FormContainer from 'src/containers/FormContainer'
import OrganizationsContainer from 'src/containers/OrganizationsContainer'

function HomePage(props) {
  return pug`
    .wrapper
      FormContainer

      if props.organization.name
        span Organization for update: 
        span= props.organization.name

      OrganizationsContainer
  `
}


const mapStateToProps = ({ session, organization }) => ({
  token: session.token,
  organization: organization.organization
})

export default connect(mapStateToProps)(HomePage)
