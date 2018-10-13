import React, { Component } from 'react';
// import Leaflet from 'leaflet';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { iconExistingArt, iconNewArt } from './Icon.js';
import ExistingArtPopup from './ExistingArtPopup';
// import NewMarker from './NewMarker'
import NewArtPopup from './NewArtPopup.js';

const stamenTonerTiles = 'http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png';
const stamenTonerAttr = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const mapCenter = [40.780059, -73.951443];
const zoomLevel = 11;


export default class MapComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentZoomLevel: zoomLevel,
      allArtworks:[],
      showMap: true,
      newArtwork: false,
      newMarkerPosition: null,
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
  };

  addNewMarker = (e) => {
    this.setState({ newMarkerPosition: [e.latlng.lat, e.latlng.lng], newArtwork: true });
  };

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
        {this.state.newArtwork ? <Marker position={this.state.newMarkerPosition} icon={iconNewArt} ><NewArtPopup /></Marker> : null}
        {this.state.allArtworks.map((artwork, idx) => 
          <Marker key={idx} position={[artwork.latitude, artwork.longitude]} icon={iconExistingArt} >
          <Popup>
            <ExistingArtPopup img_url={artwork.img_url} nickname={artwork.nickname}/>
          </Popup>
        </Marker>
        )}
      </Map>
    );
  }
}