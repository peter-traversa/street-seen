import Leaflet from 'leaflet';

const NewMarker = (props, map) => {
  return Leaflet.Marker(props.position).addTo(map);
}

export default NewMarker