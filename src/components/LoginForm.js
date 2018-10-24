import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Input, Button, Header } from 'semantic-ui-react'

class LoginForm extends Component {
  state = { 
    loginUsername: '',
    loginPassword: '',
    users: [],
    badLogin: false,
  }

  componentWillUnmount() {
    this.setState({badLogin: false})
  }

  handleLoginResponse = (data) => {
    if (data.user) {
      this.props.changeUserId(data.user);
      this.props.handleModalClose();
    } else {
      this.setState({loginUsername: '', loginPassword: '', badLogin: true})
    }
  }

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

  handleCreate

  render() {
    return (
      <React.Fragment>
        {this.state.badLogin ? <Header color='green' content='Please provide valid login credentials' /> : null}
        <Header icon='map outline' color='red' content='Login' />
        <h3>Login to add some street art or click the 'x' to view only.</h3>
        <Form onSubmit={this.handleLoginSubmit}>
          <Input focus placeholder='Username' value={this.state.loginUsername} onChange={this.handleLoginUsernameChange} /><br/>
          <Input focus type='password' placeholder='Password' value={this.state.loginPassword} onChange={this.handleLoginPasswordChange} /><br/>
          <Button inverted color='red' content='Login'/>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)