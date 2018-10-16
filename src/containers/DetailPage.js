import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react'

class DetailPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Button 
          onClick={this.props.closeDetailPage}
          content='Close Detail Page'
          color='red'
          floated='right'
        />
        <h1 align='center' >{this.props.selectedArtwork.nickname}</h1>
        <img src={`${this.props.selectedArtwork.img_url}`} alt='artwork' width='100%' ></img>
      </React.Fragment>
    )
  }
}

function MapStateToProps(state){
  return {
    selectedArtwork: state.selectedArtwork
  }
}

function MapDispatchToProps(dispatch){
  return {
    closeDetailPage: () => {
      dispatch({ type: 'CLOSE_DETAIL_PAGE', payload: null })
    }
  }
}

export default connect(MapStateToProps, MapDispatchToProps)(DetailPage)