import React, { Component } from 'react';
import { Map, TileLayer } from 'react-leaflet';
// import ExistingMarkers from './ExistingMarkers';
import { iconSprayPaint } from './Icon.js';
import { Marker, Popup } from 'react-leaflet';
import ExistingArtPopup from './ExistingArtPopup.js';

const stamenTonerTiles = 'http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png';
const stamenTonerAttr = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const mapCenter = [40.780059, -73.951443];
const zoomLevel = 9;

export default class MapComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentZoomLevel: zoomLevel,
      allArtworks:[],
    };
  }

  mountAndFetch = () => {
    fetch('http://localhost:3000/artworks')
    .then(r => r.json())
    .then(data => this.setState({allArtworks: data}))
  }

  componentDidMount() {
    const leafletMap = this.leafletMap.leafletElement;
    leafletMap.on('zoomend', () => {
      const updatedZoomLevel = leafletMap.getZoom();
      this.handleZoomLevelChange(updatedZoomLevel);
    });
    this.mountAndFetch();
  }

  handleZoomLevelChange = (newZoomLevel) => {
    this.setState({ currentZoomLevel: newZoomLevel });
  }

  addNewMarker = (e) => {
    const clickLatitude = e.latlng.lat;
    const clickLongitude = e.latlng.lng;
    console.log(clickLatitude, clickLongitude)
    console.log(this.state.allArtworks)
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
        {this.state.allArtworks.map((artwork) => 
          <Marker position={[artwork.latitude, artwork.longitude]} icon={iconSprayPaint} >
          <Popup>
            <ExistingArtPopup img_url={artwork.img_url} nickname={artwork.nickname}/>
          </Popup>
        </Marker>
        )}
      </Map>
    );
  }
}