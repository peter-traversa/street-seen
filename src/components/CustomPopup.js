import React from 'react';
import { Popup } from 'react-leaflet';

export default class CustomPopup extends React.Component {
  render() {
    return (
      <Popup>
        <h3>This is a popup!</h3>
      </Popup>
    )
  }
}