import React, { Component } from 'react';
import { Button, Grid, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
import '../App.css'

class MapMenu extends Component {
  constructor() {
    super()

    this.state = {
      // searchInput: '',
    }
  }
  
  render() {
    return (
      <div className='concrete-background' >
        <Grid columns={3}>
          <Grid.Column>
            <h2>Username: {this.props.currentUser ? `${this.props.currentUser.name}` :  'Please log in.'}</h2>
          </Grid.Column>
          <Grid.Column className='street-seen-logo'>
            <h2 align='center'>Street Seen</h2>
          </Grid.Column>
          <Grid.Column>
            {this.props.currentUser ? <Button floated='right' color='red' size='large' onClick={this.props.logoutUser} >Logout</Button> : <Button floated='right' color='green' size='large' onClick={this.props.loginUser}>Login</Button>}
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    currentUser: state.currentUser,
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