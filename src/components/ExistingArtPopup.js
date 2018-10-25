import React from 'react';
import { connect } from 'react-redux';
import { Image } from 'semantic-ui-react';

const ExistingArtPopup = (props) => {
  return(
    <div className='existing-art-popup'>
      <Image size='medium' onClick={(e) => props.viewDetailPage(props.artwork, e)} src={props.artwork.img_url} alt={props.nickname} />
      <h3 onClick={(e) => props.viewDetailPage(props.artwork, e)} >{props.artwork.nickname}</h3>
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