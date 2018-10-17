import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Image } from 'semantic-ui-react'

class DetailPage extends Component {
  render(props) {
    console.log(this.props)
    return (
      <React.Fragment>
        {/* <Button 
          onClick={console.log('toggling sidebar')}
          content='Toggle Sidebar'
          color='red'
          floated='left'
          /> */}
        <Button 
          onClick={this.props.closeDetailPage}
          content='Close Detail Page'
          color='red'
          floated='right'
        />
        <Image size='big' centered id='detail-page-image' src={`${this.props.selectedArtwork.img_url}`} alt='artwork' />
        <h1 align='center' >{this.props.selectedArtwork.nickname}</h1>
        <h3 align='center' >Approximate Location - {this.props.selectedArtwork.latitude}, {this.props.selectedArtwork.longitude}</h3>
        <h3 align='center' >Image uploaded by - {this.props.selectedArtwork.user.name}</h3>
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