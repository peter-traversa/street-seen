import React from 'react';
import { connect } from 'react-redux';

const ExistingArtPopup = (props) => {
  return(
    <div>
      <h3>{props.nickname}</h3>
      <img onClick={props.viewDetailPage} src={props.img_url} alt={props.nickname} width='300' />
    </div>
  )
}

// this.props.viewDetailPage(props)

function mapDispatchToProps(dispatch){
  return {
    viewDetailPage: (props) => {
      dispatch({type: 'VIEW_DETAIL_PAGE', payload: props})
    }
  }
}

export default connect(null, mapDispatchToProps)(ExistingArtPopup)