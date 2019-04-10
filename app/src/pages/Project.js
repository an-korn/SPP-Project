import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import ProjectContainer from 'src/containers/ProjectContainer';

class ProjectPage extends Component {
  state = {
    user: null
  }

  componentDidMount() {
    this.getUser();
  }

  getUser = () => {
    axios.get(`http://localhost:3001/api/v1/user?token=${this.props.token}`)
      .then(response => {
        this.setState({user: response.data.id})
      })
      .catch(function (error) {
        window.alert(error.response.data.errors);
      });
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

export default connect(mapStateToProps)(ProjectPage)
