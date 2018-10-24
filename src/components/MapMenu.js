import React, { Component } from 'react';
import { Button, Grid } from 'semantic-ui-react';
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
            <h2>{this.props.currentUser ? `Click on the map to add artwork.` :  'Login to add your photos.'}</h2>
          </Grid.Column>
          <Grid.Column>
            <div className='street-seen-logo'><p align='center'>Street Seen</p></div>
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
    currentUser: state.reducer.currentUser,
    mapCenter: state.reducer.mapCenter,
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