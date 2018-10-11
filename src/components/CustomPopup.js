import React from 'react';
import { Popup } from 'react-leaflet';
import { Button, Icon } from 'semantic-ui-react'

const handleFileUpload = (e) => {
  console.log(e)
}

const CustomPopup = () => {
  return (
    <Popup>
      <Button onClick={handleFileUpload} >Upload Pic</Button>
    </Popup>
  )
}

export default CustomPopup;