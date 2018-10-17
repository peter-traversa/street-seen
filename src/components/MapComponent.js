import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { iconExistingArt, iconNewArt } from './Icon.js';
import ExistingArtPopup from './ExistingArtPopup';
import NewArtPopup from './NewArtPopup.js';
import { connect } from 'react-redux';

const stamenTonerTiles = 'http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png';
const stamenTonerAttr = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
// const mapCenter = [0, 0];


class MapComponent extends Component {

  componentDidMount() {
    fetch('http://localhost:3000/artworks')
    .then(r => r.json())
    .then(data => this.props.globalStateArtworks(data))
  }

  render() {
    return (
      <Map
        center={this.props.mapCenter}
        zoom={this.props.zoomLevel}
        onClick={this.props.addNewMarker}
        onZoom={this.props.changeZoomLevel}
      >
        <TileLayer
            attribution={stamenTonerAttr}
            url={stamenTonerTiles}
        />
        {this.props.newArtwork && this.props.userId ? <Marker position={this.props.newMarkerPosition} icon={iconNewArt} ><NewArtPopup /></Marker> : null}
        {this.props.allArtworks.map((artwork, idx) => 
          <Marker key={idx} position={[artwork.latitude, artwork.longitude]} icon={iconExistingArt} >
            <Popup>
              <ExistingArtPopup artwork={artwork} />
            </Popup>
          </Marker>
        )}
      </Map>
    );
  }
}

function mapStateToProps(state){
  return {
    allArtworks: state.allArtworks,
    showMap: state.showMap,
    newArtwork: state.newArtwork,
    newMarkerPosition: state.newMarkerPosition,
    userId: state.userId,
    zoomLevel: state.zoomLevel,
    mapCenter: state.mapCenter,
  }
}

function mapDispatchToProps(dispatch){
  return {
    addNewMarker: (e) => {
      dispatch({type: 'ADD_NEW_MARKER', payload: e})
    },
    globalStateArtworks: (data) => {
      dispatch({type: 'FETCH_ALL_ARTWORKS', payload: data})
    },
    changeZoomLevel: (zoomLevel) => {
      dispatch({type: 'ZOOM_LEVEL', payload: zoomLevel.target._zoom})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapComponent);