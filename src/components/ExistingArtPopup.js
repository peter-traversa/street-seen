import React from 'react';
import { connect } from 'react-redux';

const ExistingArtPopup = (props) => {
  return(
    <div>
      <h3 onClick={props.viewDetailPage} >{props.nickname}</h3>
      <img onClick={props.viewDetailPage} src={props.img_url} alt={props.nickname} width='300' />
    </div>
  )
}

function mapDispatchToProps(dispatch){
  return {
    viewDetailPage: () => {
      dispatch({type: 'VIEW_DETAIL_PAGE', payload: null})
    }
  }
}

export default connect(null, mapDispatchToProps)(ExistingArtPopup)