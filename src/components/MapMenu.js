import React, { Component } from 'react';
import { Menu, Button, Input, Form } from 'semantic-ui-react';
import { connect } from 'react-redux';

class MapMenu extends Component {
  constructor() {
    super()

    this.state = {
      searchInput: '',
    }

  }


  handleSearchInputChange = (event) => {
    console.log('changed')
    this.setState({searchInput: event.target.value})
  }

  handleSearchSubmit = (event) => {
    event.preventDefault();
    const query = this.state.searchInput.split(' ').join('%20').toLowerCase();
    console.log(query)
    // fetch('https://nominatim.openstreetmap.org/search?format=jsonv2&city=' + query)
    // .then(r=>r.json())
    // .then(data=>console.log(data))
    this.setState({searchInput: ''})
  }

  render() {
    return (
      <Menu>
        <Menu.Item><h2>User: </h2></Menu.Item>
        <Form onSubmit={this.handleSearchSubmit} >
          <Form.Input focus placeholder='Search Map by Address' value={this.state.searchInput} onChange={this.handleSearchInputChange} />  
        </Form>
        {this.props.userId ? <Menu.Item><Button onClick={this.props.logoutUser} >Logout</Button></Menu.Item> : <Menu.Item><Button onClick={this.props.loginUser}>Login</Button></Menu.Item>}
      </Menu>
    )
  }
}

function mapStateToProps(state){
  return {
    userId: state.userId
  }
}

function mapDispatchToProps(dispatch){
  return {
    logoutUser: (e) => {
      dispatch({type: 'LOGOUT_USER', payload: null})
    },
    loginUser: (e) => {
      dispatch({type: 'LOGIN_USER', payload: null})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapMenu)