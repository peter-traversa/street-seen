import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Input, Button, Header } from 'semantic-ui-react'

class CreateUser extends Component {
  state = { 
    createUsername: '',
    createUserEmail: '',
    createUserPassword: '',
    users: [],
    badUserCreate: false,
  }

  componentWillUnmount() {
    this.setState({badUserCreate: false})
  }

  handleCreateUserResponse = (data) => {
    if (data.error) {
      this.setState({createUsername: '', createUserEmail: '', createUserPassword: '', loginUsername: '', loginPassword: '', badUserCreate: true});
    } else {
      this.props.changeUserId(data.user);
      this.props.handleModalClose();
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

  handleCreateUsername = (event) => {
    this.setState({createUsername: event.target.value})
  }

  handleCreateUserEmail = (event) => {
    this.setState({createUserEmail: event.target.value})
  }

  handleCreateUserPassword = (event) => {
    this.setState({createUserPassword: event.target.value})
  }

  render() {
    return (
      <React.Fragment>
        {this.state.badUserCreate ? <Header color='green' content='Username taken or email invalid. Please try again.' /> : null}
        <Header icon='map outline' color='red' content='Create Account' />
        <h3>Create user account</h3>
        <Form onSubmit={this.handleCreateUser}>
          <Input focus placeholder='Username' value={this.state.createUsername} onChange={this.handleCreateUsername} /><br/>
          <Input focus placeholder='Email Address' value={this.state.createUserEmail} onChange={this.handleCreateUserEmail} /><br/>
          <Input focus type='password' placeholder='Password' value={this.state.createUserPassword} onChange={this.handleCreateUserPassword} /><br/>
          <Button inverted color='red' content='Submit New User' />
        </Form>
      </React.Fragment>
    )
  }
}

function mapStateToProps(state){
  return {
    userId: state.reducer.userId,
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser)