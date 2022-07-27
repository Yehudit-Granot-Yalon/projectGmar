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
//import elevation from 'elevation'
//const elev= elevation('Rome-30m-DEM.tif')
//elev.get(latitude, longitude);
import GeoTIFF, { fromUrl, fromUrls, fromArrayBuffer, fromBlob } from 'geotiff';
//const elevation = require('elevation')('/path/to/geotif.tif');
import Excel from 'exceljs';



const input = document.getElementById('file');
input.onchange = async function(e) {
 alert("gg");
 this.file = e.target.files[0]
 const wb = new Excel.Workbook();
 const reader = new FileReader()

 reader.readAsArrayBuffer(this.file)
 reader.onload = () => {
   const buffer = reader.result;
   wb.xlsx.load(buffer).then(workbook => {
     console.log(workbook, 'workbook instance')
     workbook.eachSheet((sheet, id) => {
       sheet.eachRow((row, rowIndex) => {
         console.log(row.values, rowIndex)
       })
     })
   })
 }
  
}
//height#########

// const input = document.getElementById('file');
// input.onchange = async function() {
//   //const tiff = await fromBlob(input.files[0]);
//   const file = await fromBlob(input.files[0]);
//   //const file = await GeoTIFF.fromFile(input.files[0]); 
//   const imag = await file.getImage();
// //const imag = await input.getImage();
// const bbox = imag.getBoundingBox(); 
// const pixelWidth = imag.getWidth(); 
// const pixelHeight = imag.getHeight(); 
// const bboxWidth = bbox[ 2 ] - bbox[ 0 ]; 
// const bboxHeight = bbox[ 3 ] - bbox[ 1 ];
// //const london = fromLonLat([-0.12755, 51.507222]);
// const widthPct = ( -0.12755 - bbox[ 0 ] ) / bboxWidth;
// const heightPct = ( 51.507222 - bbox[ 1 ] ) / bboxHeight;
// const xPx = Math.floor( pixelWidth * widthPct );
// const yPx = Math.floor( pixelHeight * ( 1 - heightPct ) );
// const window = [ xPx, yPx, xPx + 1, yPx + 1 ];
// const data = await imag.readRasters( {window} );
// console.log(data.floa);
// }#################3
//const file = await geoTIFF.fromFile(input); 

//https://towardsdatascience.com/geotiff-coordinate-querying-with-javascript-5e6caaaf88cf
//elevation.get(latitude, longitude);

function pointConversion( x, y){
alert("11:55");
var firstProjection ="+proj=tmerc +lat_0=31.73439361111111 +lon_0=35.20451694444445 +k=1.0000067 +x_0=219529.584 +y_0=626907.39 +ellps=GRS80 +towgs84=-24.0024,-17.1032,-17.8444,-0.33009,-1.85269,1.66969,5.4248 +units=m +no_defs";
var secondProjection = proj4("WGS84");
alert(proj4(firstProjection,secondProjection,[x,y]));
}
//pointConversion(193030.435,687695.989);
  
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

// vectorSource.on('addfeature', function (e) {
//   flash(e.feature);
// });
// var i=0;
// var myInterval=setInterval(addRandomFeature, 2000);
drawLines();
function drawLines(){
  //const london = fromLonLat([-0.12755, 51.507222]);
var points=[ london, fromLonLat([-0.12755+0.003, 51.507222+0.001]), fromLonLat([-0.12755+0.003+0.003, 51.507222+0.001+0.001])];
var thing = new MultiLineString([points]);
var featurething = new Feature({
  name: "Thing",
  geometry: thing,
  
});
// for (i = 0; i < 10; i++) { 
//     var xx = Math.random() * (xmax - xmin) + xmin;
//     var yy = Math.random() * (ymax - ymin) + ymin;
//     points.push(ol.proj.transform([xx,yy],'EPSG:4326', 'EPSG:3857'));
// }
vectorSource.addFeature(new Feature(new Point(london)));
vectorSource.addFeature(new Feature(new Point(fromLonLat([-0.12755+0.003, 51.507222+0.001]))));
vectorSource.addFeature( featurething );
//vectorSource.addFeature(new Feature(new Circle([5e6, 7e6], 1e6)));
}
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
     extractPointDetails() 
     showTable();
     
   } 
 });
 
 
 map.on('pointermove', function (evt) {//mouseover
   const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
     return feature;
   });
   if (feature) {
     const coordinate = evt.coordinate;
     var mget = feature.getProperties()
     const str = "x: " + mget.x + "<br>y:</h2> " + mget.y + "<br>height: " + mget.height + "<br>velocity: " + mget.velocity + "<br>direction: " + mget.direction
     content.innerHTML = '<h1>Point details</h1><code>' + str + '</code>';
     overlay.setPosition(coordinate);
   
    /// var tebleDisplayId = document.getElementById("tableDisplay");
    // str="tttt";
     //tebleDisplayId.innerHTML=str;
   
    } 
   else {//to hide the popup
    overlay.setPosition(undefined);
    closer.blur();
    return false;

    
 }
 });







