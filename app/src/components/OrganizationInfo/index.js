import DeleteButton from 'src/components/DeleteButton';
import EditButton from 'src/components/EditButton';
import UserContainer from 'src/containers/UserContainer'

function OrganizationInfo(props) {
  return (
  	<div>
  	  <li>
  	    <span>Name: {props.name}, Domain: {props.domain} </span>
  	    <DeleteButton props={props}/>
  	    <EditButton props={props} />
  	  </li>
  	  <ul>
  	    <UserContainer users={props.users}/>
  	  </ul>
  	</div>
  )
}

export default OrganizationInfo
