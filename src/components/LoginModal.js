import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Header, Modal, Form, Input, Button } from 'semantic-ui-react'

class LoginModal extends Component {
  state = { 
    loginUsername: '',
    loginPassword: '',
    createUsername: '',
    createUserEmail: '',
    createUserPassword: '',
    users: [],
    badLogin: false,
    badUserCreate: false,
  }

  componentWillUnmount() {
    this.setState({badLogin: false, badUserCreate: false})
  }

  handleCreateUserResponse = (data) => {
    if (data.error) {
      this.setState({createUsername: '', createUserEmail: '', createUserPassword: '', loginUsername: '', loginPassword: '', badUserCreate: true});
    } else {
      this.props.changeUserId(data.user);
      this.props.handleModalClose();
    }
  }

  handleLoginResponse = (data) => {
    console.log(data);
    if (data.user) {
      this.props.changeUserId(data.user);
      this.props.handleModalClose();
    } else {
      this.setState({loginUsername: '', loginPassword: '', createUsername: '', createUserEmail: '', createUserPassword: '', badLogin: true})
    }
  }

  handleCreateUser = (event) => {
    fetch('http://localhost:3000/api/v1/users', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        name: this.state.createUsername, 
        email: this.state.createUserEmail, 
        password: this.state.createUserPassword
      })
    })
    .then(res => res.json())
    .then(data => this.handleCreateUserResponse(data))
  };

  handleLoginSubmit = (event) => {
    fetch('http://localhost:3000/api/v1/login', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        name: this.state.loginUsername, 
        password: this.state.loginPassword,
      })
    })
    .then(res => res.json())
    .then(data => this.handleLoginResponse(data))
  }

  handleLoginUsernameChange = (event) => {
    this.setState({loginUsername: event.target.value})
  }

  handleLoginPasswordChange = (event) => {
    this.setState({loginPassword: event.target.value})
  }

  handleCreateUsername = (event) => {
    this.setState({createUsername: event.target.value})
  }

  handleCreateUserEmail = (event) => {
    this.setState({createUserEmail: event.target.value})
  }

  handleCreateUserPassword = (event) => {
    this.setState({createUserPassword: event.target.value})
  }

  handleCreate

  render() {
    return (
      <Modal
        closeIcon
        open={this.props.modalOpen}
        onClose={this.props.handleModalClose}
        basic
        size='small'
      >
        {this.state.badLogin ? <Header color='green' content='Please provide valid login credentials' /> : null}
        {this.state.badUserCreate ? <Header color='green' content='Username taken or email invalid. Please try again.' /> : null}
        <Header icon='map outline' color='red' content='Login' />
        <Modal.Content>
          <h3>Login to add some street art or click the 'x' to view only.</h3>
          <Form onSubmit={this.handleLoginSubmit}>
            <Input focus placeholder='Username' value={this.state.loginUsername} onChange={this.handleLoginUsernameChange} /><br/>
            <Input focus type='password' placeholder='Password' value={this.state.loginPassword} onChange={this.handleLoginPasswordChange} /><br/>
            <Button inverted color='red' content='Login'/>
          </Form>
          <h3>Create user account</h3>
          <Form onSubmit={this.handleCreateUser}>
            <Input focus placeholder='Username' value={this.state.createUsername} onChange={this.handleCreateUsername} /><br/>
            <Input focus placeholder='Email Address' value={this.state.createUserEmail} onChange={this.handleCreateUserEmail} /><br/>
            <Input focus type='password' placeholder='Password' value={this.state.createUserPassword} onChange={this.handleCreateUserPassword} /><br/>
            <Button inverted color='red' content='Submit New User' />
          </Form>
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