import React from 'react';
import { Popup } from 'react-leaflet';
import { Input, Form } from 'semantic-ui-react'

const handleFileUpload = (e) => {
  console.log(e.target.files[0])
}

const CustomPopup = () => {
  return (
    <Popup>
      <Form.Group widths='equal' >
        <Form.Input fluid label='Pic Nickname' placeholder='Nickname' />
      </Form.Group>
    </Popup>
  )
}

export default CustomPopup;