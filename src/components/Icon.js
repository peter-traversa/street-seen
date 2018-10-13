import { Icon } from 'leaflet';

const iconExistingArt = new Icon({
  iconUrl: require('../images/Spray_paint.svg'),
  iconRetinaUrl: require('../images/Spray_paint.svg'),
  iconSize: [25, 40],
  shadowSize: [null, null],
  iconAnchor: [20, 20],
  shadowAnchor: [null, null],
  popupAnchor: [-10, -20],
});
const iconNewArt = new Icon({
  iconUrl: require('../images/Spray_paint.svg'),
  iconRetinaUrl: require('../images/Spray_paint.svg'),
  iconSize: [25, 40],
  shadowSize: [null, null],
  iconAnchor: [20, 20],
  shadowAnchor: [null, null],
  popupAnchor: [-10, -20],
});


export { iconExistingArt, iconNewArt };