import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { iconExistingArt, iconNewArt } from './Icon';
import ExistingArtPopup from './ExistingArtPopup';
import NewArtPopup from './NewArtPopup';
import { connect } from 'react-redux';
import Search from './MapSearch';

const stamenTonerTiles = 'http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png';
const stamenTonerAttr = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';

class MapComponent extends Component {
  
  state = {
    center: [],
    zoomLevel: 2,
  }

  // componentWillMount() {
  //   const map = L.map;
  //   this.leafletElement = map
  // }
  
  componentDidMount() {
    fetch('http://localhost:3000/artworks')
    .then(r => r.json())
    .then(data => this.props.globalStateArtworks(data))
    fetch('http://localhost:3000/tags')
    .then(r => r.json())
    .then(data => this.props.globalStateTags(data))
  }

  componentWillUnmount() {
    if (this.state.center.length > 1) {
      this.props.changeMapCenter(this.state.center);
      this.props.changeZoomLevel(this.state.zoomLevel);
    }
  }
  
  setLocalZoomState = (event) => {
    this.setState({zoomLevel: event.target.getZoom()});
  };
  
  setLocalCenterState = (event) => {
    this.setState({center: [event.target.getCenter().lat, event.target.getCenter().lng]})
  }

  render() {
    return (
      <React.Fragment>
        <Map
          ref={(map) => this.leaf = map}
          center={this.props.mapCenter}
          zoom={this.props.zoomLevel}
          onClick={this.props.addNewMarker}
          onZoom={this.setLocalZoomState}
          onDragend={this.setLocalCenterState}
        >
        <Search />
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
      </React.Fragment>
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
    globalStateTags: (data) => {
      dispatch({type: 'FETCH_ALL_TAGS', payload: data})
    },
    changeMapCenter: (center) => {
      dispatch({type: 'CHANGE_MAP_CENTER', payload: center})
    },
    changeZoomLevel: (zoomLevel) => {
      dispatch({type: 'CHANGE_ZOOM_LEVEL', payload: zoomLevel})
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapComponent);