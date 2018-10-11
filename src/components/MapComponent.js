import React, { Component } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import Markers from './Markers'

const stamenTonerTiles = 'http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png';
const stamenTonerAttr = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const mapCenter = [40.780059, -73.951443];
const zoomLevel = 9;

export default class MapComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentZoomLevel: zoomLevel,
    };
  }

  componentDidMount() {
    const leafletMap = this.leafletMap.leafletElement;
    leafletMap.on('zoomend', () => {
      const updatedZoomLevel = leafletMap.getZoom();
      this.handleZoomLevelChange(updatedZoomLevel);
    });
  }

  handleZoomLevelChange = (newZoomLevel) => {
    this.setState({ currentZoomLevel: newZoomLevel });
  }

  addNewMarker = (e) => {
    console.log(e.latlng.lat, e.latlng.lng)
  }

  render() {
    return (
      <Map
        ref={m => { this.leafletMap = m; }}
        center={mapCenter}
        zoom={zoomLevel}
        onClick={ this.addNewMarker }
      >
        <TileLayer
            attribution={stamenTonerAttr}
            url={stamenTonerTiles}
        />
        <Markers />
      </Map>
    );
  }
}