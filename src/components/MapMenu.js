import React from 'react';
import { Menu, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';

const MapMenu = (props) => {
  return (
    <Menu>
      <Menu.Item><h2>User: </h2></Menu.Item>
      {props.userId ? <Menu.Item><Button onClick={props.logoutUser} >Logout</Button></Menu.Item> : null}
    </Menu>
  )
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapMenu)