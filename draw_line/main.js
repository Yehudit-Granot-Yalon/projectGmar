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
import proj4 from 'proj4';
import LineString from 'ol/geom/LineString';
//import { Listener, MapHandlers } from 'mapboxr-gl';

alert("11:55");
//var proj4 = require("proj4")
var firstProjection ="+proj=tmerc +lat_0=31.73439361111111 +lon_0=35.20451694444445 +k=1.0000067 +x_0=219529.584 +y_0=626907.39 +ellps=GRS80 +towgs84=-24.0024,-17.1032,-17.8444,-0.33009,-1.85269,1.66969,5.4248 +units=m +no_defs";
var secondProjection = proj4("WGS84");
//I'm not going to redefine those two in latter examples.
//alert(proj4(firstProjection,secondProjection,[193030.435
//,687695.989

//]));
// [-2690666.2977344505, 3662659.885459918]


window.onload = function () {
  
  };

  //alert("itm wgs");
  // Origin Point
  const lon_0 = 35.20451694444444 // central_meridian
  const lat_0 =  31.734393611111113 // latitude_of_origin
  // False Origin
  const y_0 = 626907.390 // false_northing
  const x_0 = 219529.584 // false_easting
  const k_0 = 1.0000067 // scale_factor
  //ITMToWGS84();
  var ITM = `PROJCS["ITM", GEOGCS["ITM", DATUM["Isreal 1993", SPHEROID["GRS 1980", 6378137, 298.257222101, AUTHORITY["EPSG", "7019"]], TOWGS84[-24.0024, -17.1032, -17.8444, -0.33077, -1.85269, 1.66969, 5.4248]], PRIMEM["Greenwich", 0, AUTHORITY["EPSG", "8901"]], UNIT["degree", 0.017453292519943295, AUTHORITY["EPSG", "9102"]], AXIS["East", EAST], AXIS["North", NORTH]], UNIT["metre", 1, AUTHORITY["EPSG", "9001"]], PROJECTION["Transverse_Mercator"], PARAMETER["latitude_of_origin", ${lat_0}], PARAMETER["central_meridian", ${lon_0}], PARAMETER["false_northing", ${y_0}], PARAMETER["false_easting", ${x_0}], PARAMETER["scale_factor", ${k_0}], AXIS["East", EAST], AXIS["North", NORTH]]`
  export default function ITMToWGS84(ITMCor=[210727,745742]) {
    alert("7777777")
    //console.log(ITMCor);
    var WGS84FromITM = proj4(ITM /*from*/, 'WGS84' /*to*/ ,ITMCor)
    alert(WGS84FromITM)
    //console.log(WGS84FromITM);
    return WGS84FromITM
  }
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
  'LineString': new Style({
    stroke: new Stroke({
      color: 'red',
      width: 1,
    }),
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
    {
      'type': 'Feature',
      'geometry': {
        'type': 'Point',
        'coordinates':  fromLonLat([-0.12755,51.507222]),
      },
    },
    {
      'type': 'Feature',
      'geometry': {
        'type': 'LineString',
        'coordinates': [
         
            fromLonLat( [-0.12755,51.507222]),
            fromLonLat( [-0.12755+0.003,51.507222+0.001]),
        ],
      },
    },
  ],
};
//var point = new Point(fromLonLat[-0.12755+0.003,51.507222+0.001])
const point1 = new Point(fromLonLat( [-0.12755+0.003,51.507222+0.001]));
   const feature = new Feature(point1);

//const point1 = new Point(fromLonLat[0,0])
//  var feature = new Feature(point);

//geojsonObject.features.push(feature);
//var x1=-0.12755;
//var y2=51.507222;
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
  center: london,
  zoom: 13,
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
  const coordinate = [-122.420679, 37.772537];
   x1+=0.003;
   y2+=0.001;
   i++;
   const location = fromLonLat([x1,y2]);
   
   if(i==30)
   window.clearInterval(myInterval);

   const point = new Point(fromLonLat([x1, y2]));
   const feature = new Feature(point);
   feature.setProperties({ "x": x1, "y": y2, "height": 1000, "velocity": 98, "direction": 80})
    vectorSource.addFeature(feature);
if(i==2){
     const line = new LineString(fromLonLat([x1, y2]),fromLonLat([x1-0.003, y2-0.001]));
    const featureLine = new Feature(line);
  //  vectorSource.addFeature(featureLine);
} 
    //const line=new LineString(fromLonLat([x1, y2]));
   /* if(i%3==0){
      view.animate({
        center: location,
        duration: 1000,
      });
     
    } */
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
//var myInterval=setInterval(addRandomFeature, 2000);

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
    var mget = feature.getProperties()
    const str = "x: " + mget.x + "<br>y:</h2> " + mget.y + "<br>height: " + mget.height + "<br>velocity: " + mget.velocity + "<br>direction: " + mget.direction
    content.innerHTML = '<h1>Point details</h1><code>' + str + '</code>';
    overlay.setPosition(coordinate);
  } //else {
   // alert(" not point")


 // }
});







