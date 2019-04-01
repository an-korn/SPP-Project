import UserInfo from 'src/components/UserInfo'

const UserTable = props => {
	return pug`
	  .wrapper
	    p Users:

	    for user, key in props.users
	      span(key=key)= UserInfo(user)
	`
}

export default UserTable
