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

  componentDidMount() {
    fetch('http://localhost:3000/users')
    .then(r => r.json())
    .then(users => this.setState({users}))
  }

  componentWillUnmount() {
    this.setState({badLogin: false, badUserCreate: false})
  }

  handleCreateUser = (event) => {
    if (this.state.createUsername.length > 0 && this.state.createUserEmail.length > 0 && this.state.createUserPassword.length > 0) {
      fetch('http://localhost:3000/users', {
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
      .then(data => this.props.changeUserId(data.id))
      .then(res => this.props.handleModalClose())
      .then(res => this.setState({badLogin: false, badUserCreate: false}))
    } else {
      this.setState({createUsername: '', createUserEmail: '', createUserPassword: '', badUserCreate: true})
    }
  }

  handleLoginSubmit = (event) => {
    const loggedInUser = this.state.users.find(user => {
      return user.name === this.state.loginUsername
    })
    console.log(loggedInUser)
    if (loggedInUser && loggedInUser.password === this.state.loginPassword) {
      this.props.changeUserId(loggedInUser.id);
      this.setState({loginUsername: '', loginPassword: '', badLogin: false, badUserCreate: false})
      this.props.handleModalClose();
    } else {
      this.setState({loginUsername: '', loginPassword: '', badLogin: true})
    }
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
        {this.state.badUserCreate ? <Header color='green' content='Please provide all user credentials to create account' /> : null}
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
    userId: state.userId,
    modalOpen: state.modalOpen,
  }
}

function mapDispatchToProps(dispatch){
  return {
    changeUserId: (userId) => {
      dispatch({type: 'CHANGE_USER_ID', payload: userId})
    },
    handleModalClose: () => {
      dispatch({type: 'HANDLE_MODAL_CLOSE', payload: null})
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal)