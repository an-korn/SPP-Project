import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProjectContainer from 'src/containers/ProjectContainer';
import actions from 'src/actions';

class ProjectPage extends Component {
  render() {
  	return (
      <ProjectContainer projectId={this.props.match.params.project} user={this.props.user} />
    )
  }
}

const mapStateToProps = ({ session, user }) => ({
  token: session.token,
  user: user.user
})

export default connect(mapStateToProps, actions)(ProjectPage)
