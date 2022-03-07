import 'ol/ol.css';
import Circle from 'ol/geom/Circle';
import Feature from 'ol/Feature';
import GeoJSON from 'ol/format/GeoJSON';
import Map from 'ol/Map';
import View from 'ol/View';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
import {OSM, Vector as VectorSource} from 'ol/source';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import Point from 'ol/geom/Point';
import Overlay from 'ol/Overlay';
import {toStringHDMS} from 'ol/coordinate';
///////comix start
//import TileLayer from 'ol/layer/Tile';
/**
 * Elements that make up the popup.
 */
 const container = document.getElementById('popup');
 const content = document.getElementById('popup-content');
 const closer = document.getElementById('popup-closer');
 
 /**
  * Create an overlay to anchor the popup to the map.
  */
 const overlay = new Overlay({
   element: container,
   autoPan: {
     animation: {
       duration: 250,
     },
   },
 });
 
 /**
  * Add a click handler to hide the popup.
  * @return {boolean} Don't follow the href.
  */
 closer.onclick = function () {
   overlay.setPosition(undefined);
   closer.blur();
   return false;
 };
 ////////////comix stop
const image = new CircleStyle({
  radius: 5,
 // fill:,
  stroke: new Stroke({color: 'black', width: 3}),
});
const styles = {
'Point': new Style({
    image: image,
  }),
 };
const styleFunction = function (feature) {
  return styles[feature.getGeometry().getType()];
};
const geojsonObject = {
  'type': 'FeatureCollection',
  'crs': {
    'type': 'name',
    'properties': {
      'name': 'EPSG:3857',
    },
  },
  'features': [
   ],
};
const vectorSource = new VectorSource({
  features: new GeoJSON().readFeatures(geojsonObject),
});
const vectorLayer = new VectorLayer({
  source: vectorSource,
  style: styleFunction,
});
const map = new Map({
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
    vectorLayer,
  ],
  overlays: [overlay],
  target: 'map',
  view: new View({
    center: [0, 0],
    zoom: 1,
  }),
});


//$(document).ready(init);
//function init() {
  //alert("init")
  var x           = 0;
  var y           = 0;
 var height=0;
 var velocity=0;
 var direction=0;
 pot_point_on_map(x,y,height,velocity,direction)
 pot_point_on_map("4e6","-5e6",height,velocity,direction)
 //}
function pot_point_on_map(x,y,height,velocity,direction){
  var point=new Point([x, y],null)
  var feature=new Feature(point);
  feature.setProperties({"x":x,"y":y,"height":height,"velocity":velocity,"direction":direction})
  
  vectorSource.addFeature(feature);
}


//var point1=new Point([4e6, -5e6],null)

 map.on('click', function (evt) {
  const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
    return feature;
  });
  if (feature) {
    const coordinate = evt.coordinate;
    alert("point")
    var mget=feature.getProperties()
  //alert(  feature.)
 /* var x           = 0;
  var y           = 0;
 var height=0;
 var velocity=0;
 var direction=0;*/
    
   const str="x: "+mget.x +"<br>y: "+mget.y+"<br>height: "+mget.height+"<br>velocity: "+mget.velocity+"<br>direction: "+mget.direction
   content.innerHTML = '<p>Point details:</p><code>' + str + '</code>';
  overlay.setPosition(coordinate);
   } else {
    alert(" not point")

    
  }
});




