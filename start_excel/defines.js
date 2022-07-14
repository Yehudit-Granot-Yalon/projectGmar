import 'ol/ol.css';
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
import MultiLineString from 'ol/geom/MultiLineString';

///////comix start
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
    stroke: new Stroke({color: 'red', width: 1}),
    
    // radius: 5,
    // fill: new Fill({color: 'black'}),
    // stroke: new Stroke({ color: 'black', width: 2 }),
  });
  const styles = {
    'Point': new Style({
      image: image,
    }),
    'MultiLineString': new Style({
      stroke: new Stroke({
        color: 'black',
        width: 2,
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
      // {
      //   'type': 'Feature',
      //   'geometry': {
      //     'type': 'Point',
      //     'coordinates':  fromLonLat([-0.12755,51.507222]),
      //   },
      // },
      // {
      //   'type': 'Feature',
      //   'geometry': {
      //     'type': 'LineString',
      //     'coordinates': [
           
      //         fromLonLat( [-0.12755,51.507222]),
      //         fromLonLat( [-0.12755+0.003,51.507222+0.001]),
      //     ],
      //   },
      // },
    ],
  };
  //var point = new Point(fromLonLat[-0.12755+0.003,51.507222+0.001])
  const point1 = new Point(fromLonLat( [-0.12755+0.003,51.507222+0.001]));
     const feature = new Feature(point1);
  
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
  drawLines();