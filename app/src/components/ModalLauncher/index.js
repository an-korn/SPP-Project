import React from 'react';

import FormContainer from 'src/containers/FormContainer';
import ModalForm from '../ModalForm';

class ModalLauncher extends React.Component {
  state = {
    showModal: false
  }

  handleToggleModal = () => {this.setState({ showModal: !this.state.showModal })}

  render() {
    return(
      <div>
        <span>
          You can
          <a href="#create" onClick={this.handleToggleModal}> create new Project </a>
          to start use this service
        </span>
        {this.state.showModal &&
          <ModalForm onClose={this.handleToggleModal}>
            <FormContainer onClose={this.handleToggleModal} user={this.props.user}/>
          </ModalForm>}
      </div>
    )
  }
}

export default ModalLauncher