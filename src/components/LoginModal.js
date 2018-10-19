import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Header, Modal, Form, Input, Button } from 'semantic-ui-react'

class LoginModal extends Component {
  state = { 
    username: '',
    email: '',
  }

  handleFormSubmit = (event) => {
    if (this.state.username.length > 0 && this.state.email.length > 0) {
      fetch('http://localhost:3000/users', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({name: this.state.username, email: this.state.email})
      })
      .then(res => res.json())
      .then(data => this.props.changeUserId(data.id))
      .then(res => this.props.handleModalClose())
    } else {
      alert('Please enter a username and email address');
      this.setState({username: '', email: ''})
    }
  }

  handleUsernameChange = (event) => {
    this.setState({username: event.target.value})
  }

  handleEmailChange = (event) => {
    this.setState({email: event.target.value})
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
        <Header icon='map outline' color='red' content='Login' />
        <Modal.Content>
          <h3>Login to add some street art or click the 'x' to view only.</h3>
          <Form onSubmit={this.handleFormSubmit}>
            <Input focus placeholder='Username' value={this.state.username} onChange={this.handleUsernameChange}/><br/>
            <Input focus placeholder='Email Address' value={this.state.email} onChange={this.handleEmailChange}/><br/>
            <Button color='red' inverted content='Submit' />
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