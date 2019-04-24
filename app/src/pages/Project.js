import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProjectContainer from 'src/containers/ProjectContainer';
import actions from 'src/actions';

class ProjectPage extends Component {
  state = {
    user: null
  }

  setUser = (user) => {
    this.setState({user: user.id})
  }

  componentWillMount() {
    this.props.subscribeGetUser(this.setUser);
  }

  componentDidMount() {
    this.props.getUser(this.props.token);
  }

  render() {
  	return (
      <ProjectContainer project={this.props.match.params.project} user={this.state.user} />
    )
  }
}

const mapStateToProps = ({ session }) => ({
  token: session.token
})

export default connect(mapStateToProps, actions)(ProjectPage)
