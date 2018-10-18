import { Icon } from 'leaflet';

const iconExistingArt = new Icon({
  iconUrl: require('../images/paint-spray.png'),
  iconRetinaUrl: require('../images/paint-spray.png'),
  iconSize: [30, 30],
  shadowSize: [null, null],
  iconAnchor: [20, 20],
  shadowAnchor: [null, null],
  popupAnchor: [0, -15],
});
const iconNewArt = new Icon({
  iconUrl: require('../images/NewArtMarker.png'),
  iconRetinaUrl: require('../images/NewArtMarker.png'),
  iconSize: [150, 150],
  shadowSize: [null, null],
  iconAnchor: [55, 105],
  shadowAnchor: [null, null],
  popupAnchor: [0, -15],
});


export { iconExistingArt, iconNewArt };