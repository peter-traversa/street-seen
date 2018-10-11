import Leaflet from 'leaflet';

const iconSprayPaint = new Leaflet.Icon({
  iconUrl: require('../images/Spray_paint.svg'),
  iconRetinaUrl: require('../images/Spray_paint.svg'),
  iconSize: [25, 40],
  shadowSize: [null, null],
  iconAnchor: [20, 20],
  shadowAnchor: [null, null],
  popupAnchor: [-10, -20],
});

export { iconSprayPaint };