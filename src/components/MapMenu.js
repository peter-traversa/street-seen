import React, { Component } from 'react';
import { Menu, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';

class MapMenu extends Component {
  constructor() {
    super()

    this.state = {
      // searchInput: '',
    }
  }

  // handleSearchInputChange = (event) => {
  //   this.setState({searchInput: event.target.value})
  // }

  
  // handleSearchSubmit = (event) => {
  //   event.preventDefault();
  //   const query = this.state.searchInput.split(' ').join('+').split(',').join('%2C').toLowerCase();

  //   console.log(query)
  //   fetch(`https://api.opencagedata.com/geocode/version/json?q=${query}&key=${process.env.REACT_APP_ACCESS_KEY_ID}`)
  //   .then(res =>res.json())
  //   .then(data => console.log(data))
  //   this.setState({searchInput: ''})
  // }
  
  render() {
    return (
      <Menu>
        <Menu.Item><h2>User: </h2></Menu.Item>
        <Menu.Item><h2>Map Center: {this.props.mapCenter}</h2></Menu.Item>
        {/* <Form onSubmit={this.handleSearchSubmit} >
          <Form.Input focus placeholder='Search Map by Address' value={this.state.searchInput} onChange={this.handleSearchInputChange} />  
        </Form> */}
        {this.props.userId ? <Menu.Item><Button color='red' onClick={this.props.logoutUser} >Logout</Button></Menu.Item> : <Menu.Item><Button color='green' onClick={this.props.loginUser}>Login</Button></Menu.Item>}
      </Menu>
    )
  }
}

function mapStateToProps(state){
  return {
    userId: state.userId,
    mapCenter: state.mapCenter,
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