import DeleteButton from 'src/components/DeleteButton';
import EditButton from 'src/components/EditButton';

function UserInfo(props) {
  return (
  	<li>
  	  <span>Email: {props.email}, {props.membership}</span>
  	  <DeleteButton props={props}/>
  	  <EditButton props={props} />
  	</li>
  )
}

export default UserInfo
