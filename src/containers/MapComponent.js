import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { iconExistingArt, iconNewArt } from '../components/Icon';
import ExistingArtPopup from '../components/ExistingArtPopup';
import NewArtPopup from '../components/NewArtPopup';
import { connect } from 'react-redux';

const stamenTonerTiles = 'http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png';
const stamenTonerAttr = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';

class MapComponent extends Component {
  
  state = {
    center: [],
    zoomLevel: 2,
  }
  
  componentDidMount() {
    fetch('http://localhost:3000/api/v1/artworks')
    .then(r => r.json())
    .then(data => this.props.globalStateArtworks(data))
    fetch('http://localhost:3000/api/v1/tags')
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
    this.setState({center: [event.target.getCenter().lat, event.target.getCenter().lng]});
  }


  render() {
    return (
      <React.Fragment>
        <Map
          ref={(map) => this.map = map}
          center={this.props.mapCenter}
          zoom={this.props.zoomLevel}
          onClick={this.props.addNewMarker}
          onZoom={this.setLocalZoomState}
          onDragend={this.setLocalCenterState}
          minZoom={2}
        >
        <TileLayer
          attribution={stamenTonerAttr}
          url={stamenTonerTiles}
        />
          {this.props.newArtwork && this.props.currentUser ? <Marker position={this.props.newMarkerPosition} icon={iconNewArt} ><NewArtPopup /></Marker> : null}
          {this.props.allArtworks.map((artwork, idx) => 
            <Marker key={idx} position={[artwork.latitude, artwork.longitude]} icon={iconExistingArt} >
              <Popup minWidth='300' maxWidth='500'>
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
    allArtworks: state.reducer.allArtworks,
    showMap: state.reducer.showMap,
    newArtwork: state.reducer.newArtwork,
    newMarkerPosition: state.reducer.newMarkerPosition,
    currentUser: state.reducer.currentUser,
    zoomLevel: state.reducer.zoomLevel,
    mapCenter: state.reducer.mapCenter,
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