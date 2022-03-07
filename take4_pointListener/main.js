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
  feature.setProperties({"x":x,"y":y,"hight":height,"velocity":velocity,"direction":direction})
  
  vectorSource.addFeature(feature);
}


//var point1=new Point([4e6, -5e6],null)

 map.on('click', function (evt) {
  const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
    return feature;
  });
  if (feature) {
    
    alert("point")
    var mget=feature.getProperties()
  alert(  feature.getId())
    alert(mget.x)
   } else {
    alert(" not point")
  }
});




