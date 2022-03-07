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
alert("14:46");
const styles = {

  'Point': new Style({
    image: image,
  }),
 /* 'Point':new Style({
    stroke: new Stroke({
      color: 'red',
      width: 2,
    }),
    fill: new Fill({
      color: 'rgba(255,0,0,0.2)',
    }),
  }),*/
  'LineString': new Style({
    stroke: new Stroke({
      color: 'green',
      width: 1,
    }),
  }),
  'MultiLineString': new Style({
    stroke: new Stroke({
      color: 'green',
      width: 1,
    }),
  }),
  'MultiPoint': new Style({
    image: image,
  }),
  'MultiPolygon': new Style({
    stroke: new Stroke({
      color: 'yellow',
      width: 1,
    }),
    fill: new Fill({
      color: 'rgba(255, 255, 0, 0.1)',
    }),
  }),
  'Polygon': new Style({
    stroke: new Stroke({
      color: 'blue',
      lineDash: [4],
      width: 3,
    }),
    fill: new Fill({
      color: 'rgba(0, 0, 255, 0.1)',
    }),
  }),
  'GeometryCollection': new Style({
    stroke: new Stroke({
      color: 'magenta',
      width: 2,
    }),
    fill: new Fill({
      color: 'magenta',
    }),
    image: new CircleStyle({
      radius: 10,
      fill: null,
      stroke: new Stroke({
        color: 'magenta',
      }),
    }),
  }),
  'Circle': new Style({
    stroke: new Stroke({
      color: 'red',
      width: 2,
    }),
    fill: new Fill({
      color: 'rgba(255,0,0,0.2)',
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
    /* {
      'type': 'Feature',
      'geometry': {
        'type': 'Point',
        'coordinates': [0.0001, 0.0001],
      },
    },
   
    },*/
  ],
};

const vectorSource = new VectorSource({
  features: new GeoJSON().readFeatures(geojsonObject),
});

//vectorSource.addFeature(new Feature(new Point([5e6, 7e6],null)));

//vectorSource.addFeature(new Feature(new Circle([5e6, 7e6], 1e6)));

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
/*map.on("click", function(e) {
  map.forEachFeatureAtPixel(e.pixel, function (feature, layer) {
      
  })
});*/
/*map.on("click", function(evt) {
  var coord = ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
  var lon = coord[0];
  var lat = coord[1];
  alert(lon);
  alert(lat);
});*/
var point=new Point([0, 0],null)
vectorSource.addFeature(new Feature(point));
 //yyyy=point.getCoordinates;
//alert(yyyy);

map.on('click', function (evt) {
  const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
    return feature;
  });
  if (feature) {
    alert("point")
   /* popup.setPosition(evt.coordinate);
    $(element).popover({
      placement: 'top',
      html: true,
      content: feature.get('name'),
    });
    $(element).popover('show');*/
  } else {
    alert(" not point")
    //$(element).popover('dispose');
  }
});
alert("12:53");



