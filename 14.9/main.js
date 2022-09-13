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
import GeoTIFF, { fromUrl, fromUrls, fromArrayBuffer, fromBlob } from 'geotiff';
import Excel from 'exceljs';
import { returnOrUpdate } from 'ol/extent';



var height_above_ground;
set_height(1, 34.9,32.3).then(val => {
  // got value here
  console.log(val);
}).catch(e => {
  // error
  console.log(e);
});; 

//to read tif file
async function set_height(height,lon,lat){
  
  // var lon =34.9;
  // var lat=32.3;
const response = await fetch("a1-30m-DEM.tif");
const arrayBuffer = await response.arrayBuffer();
const tiff = await fromArrayBuffer(arrayBuffer);
const imag = await tiff.getImage();
const bbox = imag.getBoundingBox(); 
const pixelWidth = imag.getWidth(); 
const pixelHeight = imag.getHeight(); 
const bboxWidth = bbox[ 2 ] - bbox[ 0 ]; 
const bboxHeight = bbox[ 3 ] - bbox[ 1 ];
//const london = fromLonLat([-0.12755, 51.507222]);
//const rome = fromLonLat([12.5, 41.9]);
const widthPct = ( lon - bbox[ 0 ] ) / bboxWidth;
const heightPct = ( lat - bbox[ 1 ] ) / bboxHeight;
const xPx = Math.floor( pixelWidth * widthPct );
const yPx = Math.floor( pixelHeight * ( 1 - heightPct ) );
const window = [ xPx, yPx, xPx + 1, yPx + 1 ];
const data = await imag.readRasters( {window} );
//const height_above_ground=height-data[0][0];
 height_above_ground=data[0][0];

return  height_above_ground;

 }




const input2 = document.getElementById('file2');
input2.onchange = async function() {

  //const tiff = await fromBlob(input.files[0]);
  const file = await fromBlob(input2.files[0]);
  //const file = await GeoTIFF.fromFile(input.files[0]); 
  const imag = await file.getImage();
//const imag = await input.getImage();
const bbox = imag.getBoundingBox(); 
const pixelWidth = imag.getWidth(); 
const pixelHeight = imag.getHeight(); 
const bboxWidth = bbox[ 2 ] - bbox[ 0 ]; 
const bboxHeight = bbox[ 3 ] - bbox[ 1 ];
//const london = fromLonLat([-0.12755, 51.507222]);
//const rome = fromLonLat([12.5, 41.9]);
const widthPct = ( 34.9 - bbox[ 0 ] ) / bboxWidth;
const heightPct = ( 32.3 - bbox[ 1 ] ) / bboxHeight;
const xPx = Math.floor( pixelWidth * widthPct );
const yPx = Math.floor( pixelHeight * ( 1 - heightPct ) );
const window = [ xPx, yPx, xPx + 1, yPx + 1 ];
const data = await imag.readRasters( {window} );
console.log("1");
console.log(data[0]);
console.log(data[0][0]);
}//#################


var points=[];
var groupNumberSave=1;
const input1 = document.getElementById('file');
input1.onchange = async function(e) {
 var placeToStart;
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
        for(let i=1;i<10;i++){
         // console.log(row.values[i])
          if(row.values[i]=="serial number"){
          placeToStart=rowIndex;
           break;
        }
      }
       //  build_point_row_excel(row.values);
        //function search start row
       if(rowIndex>placeToStart&&row.values[2]!=undefined){
          console.log(row.values, rowIndex)
          
       put_point_on_map(row.values);
        }
       })
     
       drawLines(points);
      })
   })
 }
  
}

// const response = await fetch("a1-30m-DEM.tif");
// const arrayBuffer = await response.arrayBuffer();
// const tiff = await fromArrayBuffer(arrayBuffer);
// const imag = await tiff.getImage();
// const bbox = imag.getBoundingBox(); 
// const pixelWidth = imag.getWidth(); 
// const pixelHeight = imag.getHeight(); 
// const bboxWidth = bbox[ 2 ] - bbox[ 0 ]; 
// const bboxHeight = bbox[ 3 ] - bbox[ 1 ];
var data=[];
var counter_row=0;
 function put_point_on_map(row) {
  var data_row=[];
  var groupNumber=row[3];
  var east=row[7];
var north=row[8];
let pointArr=pointConversion(east,north)
var lon=pointArr[0];
var lat=pointArr[1];
console.log(lat);
console.log(lon);
const point = new Point(fromLonLat([lon, lat]));
points.push(fromLonLat([lon, lat]));

const feature = new Feature(point);
var height=row[9];
if(groupNumber!=groupNumberSave){
  drawLines();
  points=[];
  }
  groupNumberSave=row[3];
  counter_row++;

  
  set_height(height,lon,lat).then(val => {
  // got value here
  height_above_ground=val;
  feature.setProperties({ "a": row[2], "b": row[3], "c": row[4], "d": row[5], "e": row[6],"f": row[7],"g": row[8],"h":  row[9],"i": row[10],"j": row[11],"k": row[12],"l": row[13],"m": row[14],"n": row[15],"o": row[16],"p": row[17],"q": row[18],"r":row[19],"s":lat,"t":lon,"u":height_above_ground})
  vectorSource.addFeature(feature);
  var i;
  for(i=2;i<=19;i++){
    data_row.push(row[i]);
  }
  data_row.push(lat);
  data_row.push(lon);
  data_row.push(height_above_ground);
  console.log(data_row);
  data.push[data_row];
map.getView().setCenter( fromLonLat([lon, lat]));
  console.log(val);
}).catch(e => {
  // error
  console.log(e);
});; 



 
}

function drawLines(){
 
console.log(points);
var thing = new MultiLineString([points]);

var featurething = new Feature({
  name: "Thing",
  geometry: thing,
});
var randomColor = Math.floor(Math.random()*16777215).toString(16);
featurething.setStyle(
  new Style({
    stroke: new Stroke({
      //color: '#2a1f1c',
      color: '#'+randomColor,
      width: 2
    })
  })
);

vectorSource.addFeature( featurething );
//vectorSource.addFeature(new Feature(new Circle([5e6, 7e6], 1e6)));
}

  
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


// const iconFeature = new Feature({
//   geometry: new Point([32.30302603362039, 034.90598004775353]),
//   name: 'Null Island',
//   population: 4000,
//   rainfall: 500,
// });

// const iconStyle = new Style({
//   image: new Icon({
//     anchor: [0.5, 46],
//     anchorXUnits: 'fraction',
//     anchorYUnits: 'pixels',
//     src: 'data/icon.png',
//   }),
// });

// iconFeature.setStyle(iconStyle);

// const vectorSource = new VectorSource({
//   features: [iconFeature],
// });
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
  zoom: 17,
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
// function CenterMap(long, lat) {
//   alert("CenterMap");
//   pointConversion(long, lat);
//   map.getView().setCenter( fromLonLat([34.92391242


//     , 32.2826553
//   ]));
//   // console.log("Long: " + long + " Lat: " + lat);
//   // map.getView().setCenter(ol.proj.transform([long, lat], 'EPSG:4326', 'EPSG:3857'));
//   // map.getView().setZoom(5);
// }
//CenterMap(193030.435,687695.989);

function pointConversion( x, y){//the fuction return convert point in arr with lat and lon
  //alert("pointConversion");
  var firstProjection ="+proj=tmerc +lat_0=31.73439361111111 +lon_0=35.20451694444445 +k=1.0000067 +x_0=219529.584 +y_0=626907.39 +ellps=GRS80 +towgs84=-24.0024,-17.1032,-17.8444,-0.33009,-1.85269,1.66969,5.4248 +units=m +no_defs";
  var secondProjection = proj4("WGS84");
  //alert(proj4(firstProjection,secondProjection,[x,y]));
  var pointConvertArr=proj4(firstProjection,secondProjection,[x,y]);
 // alert(pointConvertArr);
 // alert(pointConvertArr[0]);
  //alert(pointConvertArr[1]);
  return pointConvertArr;
}










  
 




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
//drawLines();

/////////sof animation
//}

//}

function converting_to_wgs84(height){
return 1;
    }


map.on('click', function (evt) {
  const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
     return feature;
   });
   if (feature) {
    var properties = feature.getProperties()
     extractPointDetails(properties); 
     
     showTable();
     
   } 
 });
 
 
 map.on('pointermove', function (evt) {//mouseover
   const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
     
    return feature;
   });
   if (feature) {
   var type= feature.getGeometry().getType();
    if(type=="Point"){
      // change mouse cursor when over marker
    //  map.on('pointermove', function (e) {
        // const pixel = map.getEventPixel(evt.originalEvent);
        // const hit = map.hasFeatureAtPixel(pixel);
        // map.getTarget().style.cursor = hit ? 'pointer' : '';
      //});

    var properties = feature.getProperties()
    extractPointDetails(properties); 
      showShortTable();
     }
    // const coordinate = evt.coordinate;
    //  var mget = feature.getProperties()
    //  const str = "x: " + mget.a + "<br>y:</h2> " + mget.b + "<br>height: " + mget.c+ "<br>velocity: " + mget.velocity + "<br>direction: " + mget.direction
    //  content.innerHTML = '<h1>Point details</h1><code>' + str + '</code>';
    //  overlay.setPosition(coordinate);
   
    /// var tebleDisplayId = document.getElementById("tableDisplay");
    // str="tttt";
     //tebleDisplayId.innerHTML=str;
   
    } 
   else {//to hide the popup
    // overlay.setPosition(undefined);
    // closer.blur();
    // return false;
  // var str ="";
  //   var tebleDisplayId = document.getElementById("shortTableDisplay");
  //   tebleDisplayId.innerHTML=str;
    
 }
 });







