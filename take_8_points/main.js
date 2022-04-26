
//var isPositiveNumber = require('is-positive-number');
//alert(isPositiveNumber(-2));

import 'ol/ol.css';
import Circle from 'ol/geom/Circle';
import Feature from 'ol/Feature';
import GeoJSON from 'ol/format/GeoJSON';
import Map from 'ol/Map';
import View from 'ol/View';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import Point from 'ol/geom/Point';
import Overlay from 'ol/Overlay';
import {easeOut} from 'ol/easing';
import {fromLonLat} from 'ol/proj';
import {getVectorContext} from 'ol/render';
import {unByKey} from 'ol/Observable';

//import { toStringHDMS } from 'ol/coorimport Fill from 'ol/style/Fill';
//import TileLayer from 'ol/layer/Tile';
window.onload = function () {
  alert("16:01");

};

//////design map
const stylesMap = [
  'RoadOnDemand',
  'Aerial',
  'AerialWithLabelsOnDemand',
  'CanvasDark',
  'OrdnanceSurvey',
];


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
  fill: new Fill({color: 'black'}),
  // fill:,
  stroke: new Stroke({ color: 'black', width: 2 }),
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
  wrapX: false,
});
const vectorLayer = new VectorLayer({
  source: vectorSource,
  
  
  style: styleFunction,
});
const tileLayer=new TileLayer({
    source: new OSM(),
    wrapX: false,
  })
const istanbul = fromLonLat([28.9744, 41.0128]);
const london = fromLonLat([-0.12755, 51.507222]);
const view = new View({
  center: istanbul,
  zoom: 6,
});
const map = new Map({
  layers: [
    tileLayer,
    vectorLayer,
  ],
  overlays: [overlay],
  target: 'map',
  view: view,
  multiWorld: true,
});
var x1=-0.12755;
var y2=51.507222;
function addRandomFeature() {//animation 
   x1+=0.1;
   y2+=0.1;
   i++;
   const location = fromLonLat([x1,y2]);
   
    view.animate({
      center: location,
      duration: 2000,
    });
   

   if(i==30)
   window.clearInterval(myInterval);

   const geom = new Point(fromLonLat([x1, y2]));
   const feature = new Feature(geom);
   feature.setProperties({ "x": x1, "y": y2, "height": 0, "velocity": 0, "direction": 0})
    vectorSource.addFeature(feature);
    
  }
  
  const duration = 3000;
function flash(feature) {
  const start = Date.now();
  const flashGeom = feature.getGeometry().clone();
  const listenerKey = tileLayer.on('postrender', animate);

  function animate(event) {
    const frameState = event.frameState;
    const elapsed = frameState.time - start;
    if (elapsed >= duration) {
      unByKey(listenerKey);
      return;
    }
     const vectorContext = getVectorContext(event);
    const elapsedRatio = elapsed / duration;
    // radius will be 5 at start and 30 at end.
    const radius = easeOut(elapsedRatio) * 25 + 5;
    const opacity = easeOut(1 - elapsedRatio);

    const style = new Style({
      image: new CircleStyle({
        radius: radius,
        stroke: new Stroke({
          color: 'rgba(255, 0, 0, ' + opacity + ')',
          width: 0.25 + opacity,
        }),
      }),
    });

    vectorContext.setStyle(style);
    vectorContext.drawGeometry(flashGeom);
    // tell OpenLayers to continue postrender animation
    map.render();
  }
}

vectorSource.on('addfeature', function (e) {
  flash(e.feature);
});
var i=0;
var myInterval=setInterval(addRandomFeature, 1000,10);
//window.setInterval(addRandomFeature, 1000,10);

//for( i=0;i<13;i++){
//addRandomFeature();
/////////sof animation
//}

//}
function set_height(height){

return 1;
}
function converting_to_wgs84(height){

    return 1;
    }
function put_point_on_map(x, y, height, velocity, direction) {
  var point = new Point(fromLonLat[x, y])
  var feature = new Feature(point);
  feature.setProperties({ "x": x, "y": y, "height": height, "velocity": velocity, "direction": direction })

  vectorSource.addFeature(feature);
}

map.on('click', function (evt) {
  const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
    return feature;
  });
  if (feature) {
    const coordinate = evt.coordinate;
    alert("point")
    var mget = feature.getProperties()
    const str = "x: " + mget.x + "<br>y: " + mget.y + "<br>height: " + mget.height + "<br>velocity: " + mget.velocity + "<br>direction: " + mget.direction
    content.innerHTML = '<p>Point details:</p><code>' + str + '</code>';
    overlay.setPosition(coordinate);
  } else {
    alert(" not point")


  }
});








