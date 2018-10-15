import React from 'react'

const ExistingArtPopup = (props) => {
  return(
    <div>
      <h3>{props.nickname}</h3>
      <img src={props.img_url} alt={props.nickname} width='300' />
    </div>
  )
}

export default ExistingArtPopup