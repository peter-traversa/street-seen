import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react'

class DetailPage extends Component {
  render() {
    console.log(this.props.selectedArtwork)
    return (
      <React.Fragment>
        <Button 
          onClick={this.props.closeDetailPage}
          content='Close Detail Page'
          color='red'
        />
        <h1>This is a detail page</h1>
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