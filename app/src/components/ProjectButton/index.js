import React from 'react';
import injectSheet from "react-jss";

import FormContainer from 'src/containers/FormContainer';
import ModalForm from '../ModalForm';
import StyledButton from 'src/components/StyledButton';
import styles from './styles';

class ProjectButton extends React.Component {
  state = {
    showModal: false
  }

  handleToggleModal = () => {this.setState({ showModal: !this.state.showModal })}

  render() {
    return(
      <div className={this.props.classes.buttonLayout}>
        <StyledButton onClick={this.handleToggleModal} icon={this.props.icon} />
        {this.state.showModal &&
          <ModalForm onClose={this.handleToggleModal}>
            <FormContainer project_id={this.props.project} update={this.props.update} onClose={this.handleToggleModal} user={this.props.user} />
          </ModalForm>}
      </div>
    )
  }
}

export default injectSheet(styles)(ProjectButton)