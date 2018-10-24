import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal } from 'semantic-ui-react'
import LoginForm from './LoginForm';
import CreateUser from './CreateUser'

class LoginModal extends Component {

  state = {
    showUserLogin: true,
  };

  createAccount = () => {
    this.setState({showUserLogin: false})
  }

  loginForm = () => {
    this.setState({showUserLogin: true})
  }

  render() {
    return (
      <Modal
        closeIcon
        open={this.props.modalOpen}
        onClose={this.props.handleModalClose}
        basic
        size='small'
      >
        <Modal.Content>
          {this.state.showUserLogin ? <LoginForm /> : <CreateUser />}
          {this.state.showUserLogin ? <p onClick={this.createAccount}>Click to Create Account</p> : <p onClick={this.loginForm}>Click to Return to Login Form</p>}
        </Modal.Content>
      </Modal>
    )
  }
}

function mapStateToProps(state){
  return {
    userId: state.reducer.userId,
    modalOpen: state.reducer.modalOpen,
  }
}

function mapDispatchToProps(dispatch){
  return {
    changeUserId: (user) => {
      dispatch({type: 'CHANGE_USER', payload: user})
    },
    handleModalClose: () => {
      dispatch({type: 'HANDLE_MODAL_CLOSE', payload: null})
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal)