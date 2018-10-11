import React, { Component } from 'react';
import { Marker } from 'react-leaflet';
import { iconSprayPaint } from './Icon.js';
import NewArtPopup from './NewArtPopup.js';

const position = [40.780059, -73.951443];

export default class Markers extends Component {
  render() {
    return (
      <Marker 
        position={ position }
        icon={ iconSprayPaint }
        >
        <NewArtPopup />
      </Marker>
    )
  }
}