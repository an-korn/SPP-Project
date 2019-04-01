import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import UserTable from 'src/components/UserTable';

class UserContainer extends React.Component {
  render() {
    return (
      <div>
        <UserTable users={this.props.users}/>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addUser: user => {
      dispatch({
        type: 'ADD_USER',
        user: user
      })
    }
  }
}

export default connect(null, mapDispatchToProps)(UserContainer)
