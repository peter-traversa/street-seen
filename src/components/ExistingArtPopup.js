import React from 'react';
import { connect } from 'react-redux';

const ExistingArtPopup = (props) => {
  return(
    <div>
      <h3 onClick={props.viewDetailPage} >{props.artwork.nickname}</h3>
      <img onClick={(e) => props.viewDetailPage(props.artwork, e)} src={props.artwork.img_url} alt={props.nickname} width='300' />
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