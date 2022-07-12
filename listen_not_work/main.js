import 'ol/ol.css';
import Circle from 'ol/geom/Circle';
import Feature from 'ol/Feature';
import GeoJSON from 'ol/format/GeoJSON';
import Map from 'ol/Map';
import 'elm-pep';
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
//import xlsxFile from 'read-excel-file/node'
import ExcelJS from 'exceljs';
//import Geometry from 'ol/geom/Geometry';
import LineString from 'ol/geom/LineString';
alert("11:55");

function putTwoPoint(){
  var x=-0.12755;
  var y=51.507222;
  x+=0.003;
  y+=0.001;
  const geom1 = new Point(fromLonLat([x, y]));
  const geomCircle = new Circle(fromLonLat([x, y]));
  x+=0.003;
  y+=0.001;
  const geom2 = new Point(fromLonLat([x, y]));
   
   
   const featurePoint1 = new Feature(geom1);
   featurePoint1.setProperties({ "x": x, "y": y, "height": 1000, "velocity": 98, "direction": 80})
   //vectorSource.addFeature(featurePoint1);
   const featurePoint2 = new Feature(geom2);
   featurePoint2.setProperties({ "x": x, "y": y, "height": 1000, "velocity": 98, "direction": 80})
   //vectorSource.addFeature(featurePoint2);
   const featureCircle = new Feature(geomCircle);
   featureCircle.setProperties({ "x": x, "y": y, "height": 1000, "velocity": 98, "direction": 80})
 //  vectorSource.addFeature(featureCircle);
    
     const geomLine = new LineString(fromLonLat([-0.12755+0.003, 51.507222+0.001]),
     );
    const featureLine3 = new Feature(geomLine);
    vectorSource.addFeature(featureLine3);


     var myFeature = new Feature({
      geometry : new LineString([-0.12755+0.003, 51.507222+0.001],
        [-0.12755+0.003+0.003, 51.507222+0.001+0.001]),
      style : new Style({
          stroke : new Stroke({color : "red"})})
   });
    // alert("000");
    //vectorLayer.addFeature(myFeature);

    
  
    
    
}



import * as XLSX from 'xlsx/xlsx.mjs';
import * as fs from 'fs';
XLSX.set_fs(fs);

// /* load 'stream' for stream support */
import  Readable from 'stream';
XLSX.stream.set_readable(Readable);

/* load the codepage support library for extended support with older formats  */
// import * as cpexcel from 'xlsx/dist/cpexcel.full.mjs';
// XLSX.set_cptable(cpexcel);


//readExcel1();
//readExcel2();
//readExcel3();
//convertion();
function readExcel3(){
  const wb = new ExcelJS.Workbook();

const fileName = './file1.xlsx';

wb.xlsx.readFile(fileName).then(() => {
    
    const ws = wb.getWorksheet('Sheet1');

    const c1 = ws.getColumn(1);
    
    c1.eachCell(c => {

        console.log(c.value);
    });

    const c2 = ws.getColumn(2);
    
    c2.eachCell(c => {

        console.log(c.value);
    });
}).catch(err => {
    console.log(err.message);
});

}

function readExcel1(){
  xlsxFile('./file1.xlsx').then((rows) => {
    rows.forEach((col)=>{
            col.forEach((data)=>{
              alert(data)
              console.log(data);
              console.log(typeof data);
        })
    })
    })
  

  
}
function readExcel2(){
  // Reading our test file
const file = XLSX.readFile('file1.xlsx')
//var workbook = XLSX.readFile(filename, opts);

}
  


window.onload = function () {
  
  };
  function convertion(){
    //hamarot
//var proj4 = require("proj4")
var firstProjection ="+proj=tmerc +lat_0=31.73439361111111 +lon_0=35.20451694444445 +k=1.0000067 +x_0=219529.584 +y_0=626907.39 +ellps=GRS80 +towgs84=-24.0024,-17.1032,-17.8444,-0.33009,-1.85269,1.66969,5.4248 +units=m +no_defs";
var secondProjection = proj4("WGS84");
//I'm not going to redefine those two in latter examples.
alert(proj4(firstProjection,secondProjection,[193030.435
,687695.989
]));
// [-2690666.2977344505, 3662659.885459918]

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
  'Circle':new Style({
    image: new CircleStyle({
      radius:10,
      stroke: new Stroke({
        color: 'rgba(255, 0, 0,1)',
        width: 0.25 +1,
      }),
    }),
  }),
  'LineString':new Style({
    // new Style({
      stroke: new Stroke({
        color:  'black',
        width:  2,
      }),
    // }),
    // new Style({
    //   stroke: new Stroke({
    //     color: blue,
    //     width: width,
    //   }),
    // }),
    
   
    //image: image,
    // stroke: new Stroke({
    //   color: '#ffcc33',
    //   width: 2,
    // }),
   }),
  'Point': new Style({
    image: image,
  }),
};
const styleFunction = function (feature) {
  //alert(feature.getGeometry().getType());
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
putTwoPoint();
var x1=-0.12755;
var y2=51.507222;
var savePoint;
var countPoint=0;
function putLine(){
  var geom1 = new Point(fromLonLat([x1, y2]));
  var geom2 = new Point(fromLonLat([x1+0.003, y2+0.001]));
  const geomLine = new LineString([geom1, geom2]);
    //const geomLine = new LineString([savePoint, geom]);
    
    const featureLine = new Feature(geomLine);
      vectorSource.addFeature(featureLine);

}

function addRandomFeature() {//animation 
  countPoint++;
  const coordinate = [-122.420679, 37.772537];


   x1+=0.003;
   y2+=0.001;
   i++;
   const location = fromLonLat([x1,y2]);
   
   if(i==30)
   window.clearInterval(myInterval);

   const geom = new Point(fromLonLat([x1, y2]));

   
   
   const featurePoint = new Feature(geom);
   featurePoint.setProperties({ "x": x1, "y": y2, "height": 1000, "velocity": 98, "direction": 80})
    vectorSource.addFeature(featurePoint);
    
    // if(countPoint!=1){
    //   //var vector = new OpenLayers.Layer.Vector();
    // //  const geometry=new Geometry();
    // const geomLine = new LineString([savePoint, geom]);
    // //const geomLine = new LineString([savePoint, geom]);
    
    // const featureLine = new Feature(geomLine);
    //   vectorSource.addFeature(featureLine);
    //  // map.addLayers([vector]);
    
  
    //  }
    
    savePoint=geom;
   /* if(i%3==0){
      view.animate({
        center: location,
        duration: 1000,
      });
     
    } */
    // map = new OpenLayers.Map();

    // var start_point = new OpenLayers.Geometry.Point(0,10);
    // var end_point = new OpenLayers.Geometry.Point(30,0);
    
    
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
//putLine();
var myInterval=setInterval(addRandomFeature, 2000);

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
//alert("listen");
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








