import React from 'react';
import { connect } from 'react-redux';
import { Image } from 'semantic-ui-react';

const ExistingArtPopup = (props) => {
  return(
    <div>
      <h3 onClick={props.viewDetailPage} >{props.artwork.nickname}</h3>
      <Image onClick={(e) => props.viewDetailPage(props.artwork, e)} src={props.artwork.img_url} alt={props.nickname} size='medium' />
    </div>
  )
}

function mapDispatchToProps(dispatch){
  return {
    viewDetailPage: (artwork) => {
      dispatch({type: 'VIEW_DETAIL_PAGE', payload: artwork})
    }
  }
}

export default connect(null, mapDispatchToProps)(ExistingArtPopup)