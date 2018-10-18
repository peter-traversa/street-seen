import React from 'react';
import { connect } from 'react-redux';
import { Card, Image } from 'semantic-ui-react';

const ArtworkList = (props) => {
  return (
    props.allArtworks.map(artwork => {
      return(
        <Card color='red' key={artwork.id} >
          <Image src={`${artwork.img_url}`} alt={artwork.nickname} data-id={artwork.id} onClick={props.viewArtworkFromList} />
          <Card.Content>
            <Card.Header >{artwork.nickname}</Card.Header>
          </Card.Content>
        </Card>
      )
    })
  )
}

function mapStateToProps(state) {
  return {
    allArtworks: state.allArtworks
  }
}

function mapDispatchToProps(dispatch) {
  return {
    viewArtworkFromList: (event) => {
      event.persist();
      console.log(event.nativeEvent.target.dataset.id)
      dispatch({ type: 'VIEW_ARTWORK_FROM_LIST', payload: event.nativeEvent.target.dataset.id })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtworkList);