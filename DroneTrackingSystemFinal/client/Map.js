import 'ol/ol.css';
import Feature from 'ol/Feature';
import Map from 'ol/Map';
import View from 'ol/View';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { OSM, Vector as VectorSource,Vector } from 'ol/source';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import Point from 'ol/geom/Point';
import Overlay from 'ol/Overlay';
import {easeOut} from 'ol/easing';
import {fromLonLat} from 'ol/proj';
import {getVectorContext} from 'ol/render';
import {unByKey} from 'ol/Observable';
import MultiLineString from 'ol/geom/MultiLineString';
import XYZ from 'ol/source/XYZ';
import {KalmanFilter} from 'kalman-filter'
//Setting the mode option, real time, a file to restore tracking, a new file to process data
globalThis.typeOfFile = "";
globalThis.newFile="new_file";
globalThis.readyFile="ready_file";
globalThis.realTime="realTime";
 
var observations = [];//Defining an array of Kalman filter location indicators
 //A function that inputs a location to a Kalman filter and returns an exact location
function enterArrKalman(coordinate){
  observations.push(coordinate)
const kFilter = new KalmanFilter({observation: 2});
const res = kFilter.filterAll(observations)
return res[res.length-1];
}

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
globalThis.vectorSource = new VectorSource({//Defining the source vector of the map
});

globalThis.image = new CircleStyle({
  radius: 5,
  fill: new Fill({color: 'black'}),
  stroke: new Stroke({color: 'AliceBlue', width: 2}),
});
globalThis.image2 = new CircleStyle({
  radius: 5,
  fill: new Fill({color: 'black'}),
  stroke: new Stroke({color: 'red', width: 2}),
});
globalThis.styles = {
'Point': new Style({
        image:image,
    
   }),
  'MultiLineString': new Style({
    stroke: new Stroke({
      color: 'black',
      width: 2,
    }),
  }),
};

globalThis.styleFunction = function (feature) {//A function that returns the style of the requested shape
  return styles[feature.getGeometry().getType()];
};

globalThis.vectorLayer = new VectorLayer({//Defining the vector layer of the map
 source: vectorSource,
  style: styleFunction,
});

globalThis.tileLayer=new TileLayer({//Setting the map tile layer
  source: new XYZ({//!!!!!
  url: 'http://localhost/tile/{z}/{x}/{y}.png'//Loading the tiles according to their position and zoom level
  })
  
  })
const israel=fromLonLat([34.90643994, 32.30232145]);//zoom in start
//Setting the display of the map in Israel
globalThis.view = new View({
  center: israel,
  zoom: 17,
});

//Defining the map with the defined vectors
globalThis.map = new Map({
  layers: [
    tileLayer,
    vectorLayer,
  ],
  overlays: [overlay],
  target: 'map',
  view: view,
  multiWorld: true,
});


globalThis.points=[];//A set of coordinates of a certain drone
//A function that creates a route between the points on the map
globalThis.drawLines=function(){
  var thing = new MultiLineString([points]);//A shape that contains all the lines according to the points
  var featurething = new Feature({//Single line definition
    name: "Thing",
    geometry: thing,
  });
  var randomColor = Math.floor(Math.random()*16777215).toString(16);//Random color calculation
  featurething.setStyle(//Defining the style of each line of the route
    new Style({
      stroke: new Stroke({
        color: '#'+randomColor,
        width: 2
      })
    })
  );
  vectorSource.addFeature( featurething );//Adding the track to the vector source layer
  }
  
  globalThis.dataArr=[];//Defining an array in which the processed data of all identified drones will be stored in order to write them to a file
globalThis.groupNumberSave=1;
 
  //A function that receives an array of point details and puts the data on a map
  globalThis.put_point_on_map=function(row){
var groupNumber=row[1];//Display which drone has been detected now
 var lon;
 var lat;
 if(typeOfFile ==newFile||typeOfFile ==realTime){//In a raw data file and in real time it is necessary to make conversions
 var east=row[5];
var north=row[6];
if(groupNumber!=groupNumberSave){//If there is a new drone detected we update the data set of the Kalman filter algorithm
observations = [];
}
var pointsAfterFilter=enterArrKalman([east,north]);//Performing noise filtering to the point obtained before the conversion
var pointAfrerConvert=converting_to_wgs84(pointsAfterFilter);//Converting from itm to wgs84
lon=pointAfrerConvert[0];
lat=pointAfrerConvert[1];
 }
 if(typeOfFile ==readyFile){//In a ready file there is no need to perform a conversion
    lon=row[19];
    lat=row[18];
 }
const point = new Point(fromLonLat([lon, lat]));//Defining the shape of the point on the map
const feature = new Feature(point);//Place the point in the feature 

if(groupNumber!=groupNumberSave){//If it is a new drone, a new route is needed, therefore a route of the previous points is drawn
 drawLines();
 observations = []
 points=[fromLonLat([lon, lat])];
 }
 else{
   points.push(fromLonLat([lon, lat]));
 }
 groupNumberSave=groupNumber;
 if(typeOfFile ==newFile||typeOfFile ==realTime){//// got value of height here
 set_height(lon,lat).then(val => {// got value of height here
 var height_above_ground=val;
 //Place all details of the drone flight within the displayed point
 feature.setProperties({"serial number": row[0], "consec trck": row[1], "buffer": row[2], "WinN": row[3],
  "plot number": row[4],"East": parseFloat(row[5]).toFixed(0),"North":parseFloat(row[6]).toFixed(0),"Alt msl(z)":  parseFloat(row[7]).toFixed(0),
  "range": parseFloat(row[8]).toFixed(0),"Vx": parseFloat(row[9]).toFixed(1),"Vy": parseFloat(row[10]).toFixed(1),
  "Vz": parseFloat(row[11]).toFixed(1),"V": parseFloat(row[12]).toFixed(1),"AZ AOA": parseFloat(row[13]).toFixed(1),
  "EL AOA":parseFloat(row[14]).toFixed(1),"MRC SNR": parseFloat(row[15]).toFixed(1),"rMRC": parseFloat(row[16]).toFixed(2),
 "dMRC":parseFloat(row[17]).toFixed(2),"Latitude":parseFloat(lat).toFixed(7),"Longitude":parseFloat(lon).toFixed(7),"Height":row[7]-height_above_ground})
 
row.push(lat);
row.push(lon);
row.push(height_above_ground);
dataArr.push(row);//Adding the processed values: calculating the conversions and calculating the height to the array of details
 }).catch(e => {// error
 console.log(e);
});; 
 }

 if(typeOfFile ==readyFile){//Data file is ready, there is no need to calculate height, just put the details in the displayed point
   feature.setProperties({"serial number": row[0], "consec trck": row[1], "buffer": row[2], "WinN": row[3],
   "plot number": row[4],"East": parseFloat(row[5]).toFixed(0),"North":parseFloat(row[6]).toFixed(0),"Alt msl(z)":  parseFloat(row[7]).toFixed(0),
   "range": parseFloat(row[8]).toFixed(0),"Vx": parseFloat(row[9]).toFixed(1),"Vy": parseFloat(row[10]).toFixed(1),
   "Vz": parseFloat(row[11]).toFixed(1),"V": parseFloat(row[12]).toFixed(1),"AZ AOA": parseFloat(row[13]).toFixed(1),
   "EL AOA":parseFloat(row[14]).toFixed(1),"MRC SNR": parseFloat(row[15]).toFixed(1),"rMRC": parseFloat(row[16]).toFixed(2),
  "dMRC":parseFloat(row[17]).toFixed(2),"Latitude":parseFloat(row[18]).toFixed(7),"Longitude":parseFloat(row[19]).toFixed(7),"Height":row[20]})
}
 
vectorSource.addFeature(feature);//Adding the point to the source vector of the map
 map.getView().setCenter( fromLonLat([lon, lat]));//Moving the map display according to the location of the point we defined
 }
  
 //Table header definition
 var headerTableStr = '<table id="tableOfCountry"';
 headerTableStr += '<tr>'
 headerTableStr += '<th><p>' + 'serial <br> number' + '</p></th><th><p>' + 'consec <br> trck' + '</p></th>'+'<th><p>' + '<br> buffer#'+'</p></th>'+'<th><p>' + ' <br> WinN'+'</p></th>'+'<th><p>' + ' plot <br> number'+'</p></th>'
  + '<th><p>' + ' <br> Eest (x)'+'</p></th>' +'<th><p>'+ ' <br> North (y)'+'</p></th>' +'<th><p>' + 'Alt msl <br> (z)'+'</p></th>' +'<th><p>'+ ' <br> range'+'</p></th>'  +'<th><p>'+ ' <br> Vx'+'</p></th>' +'<th><p>' + ' <br> Vy'+'</p></th>' +'<th><p>' + ' <br> Vz'+'</p></th>'
  +'<th><p>' + ' <br>V '+'</p></th>' +'<th><p>' + ' <br>AZ AOA '+'</p></th>' +'<th><p>' + ' <br>EL AOA'+'</p></th>' +'<th><p>' + 'MRC <br>SNR '+'</p></th>' +'<th><p>' + ' <br>rMRC '+'</p></th>'+'<th><p>' + ' <br>dMRC '+'</p></th>' +'<th><p>' + ' <br>Latitude '
  +'<th><p>' + ' <br>Longtitude '+'</p></th>'+'<th><p>' + 'Height <br>(above  <br> ground) '+'</p></th>' ;
  
 var tebleDisplayId = document.getElementById("tableDisplay");//The place of the map view

 //A function that displays the empty table without details at the beginning of the program
globalThis.showEmptyTable=function() {
  var str=headerTableStr
  str += '<tr>'//second row of details
  for (var i = 0; i < 21; ++i) {
    str += '<td><p>' +'|'+'</p></td>' ;
  }
str += '</tr>'
tebleDisplayId.innerHTML=str;
}

showEmptyTable();//Showing an empty table at the beginning of the program

//A function that creates the table of all details when a user clicks on a point
function showTable() {
  var str =headerTableStr;
    str += '<tr>'//second row of details
    for (var i = 0; i < 21; ++i) {
      str += '<td><p>' + pointDetails[i] + '</p></td>' ;
    }
  str += '</tr>'
 tebleDisplayId.innerHTML=str;
  }

  

//A function that initializes the point to be compared
function initSavePoint(json){
  savePoint=json.points[0];
}
//A variable initializer intended to say which drone they wanted to stop
var numDroneToStop=-1;

//A function that handles real-time data
function setRealTimePoint(json) {
  var serialNumber=json.points[0][0];//A point that the radar detected
  var groupDrone=json.points[0][1];//Displays the drone to which the point belongs
if(ifStopDrone==true){//The user chose to stop a drone
  numDroneToStop=groupDrone;//The drone is being stopped
ifStopDrone=false;//Next time the program will not have to update update drone stop
 }
  if(serialNumber!=savePoint[0]&&groupDrone!=numDroneToStop){//If a flight point has been updated and it is not a drone to stop
   put_point_on_map(json.points[0]);//Displays the point on the map
  }
savePoint=json.points[0];//Saving a previous point for next time
}

//A function that checks whether a new point has been updated in json  
function checkingIfUpdated() {
      fetch('./data.json')
      .then((response) => response.json())
      .then((json) => setRealTimePoint(json)//Sending to order on the map
      )
    }

    document.getElementById("realTime").addEventListener("click", actRealTime);//Listens to the state that the user has clicked real time
    globalThis.realTimeState=false;//Updating whether the situation is real time
    var myInterval;
    document.getElementById('stopDrone').style.visibility = 'hidden';//Option to block a drone is only in real time
    var savePoint=[];
    //A function that arranges the tracking program in real time
    function actRealTime() {
      var strReal=document.getElementById("realTime")
       if(realTimeState==false){
        typeOfFile  = realTime;//Update that the file to be saved will be a real time file
       //Checking which point is already in the file for checking if there is a new point detected
 
fetch('./data.json')
.then((response) => response.json())
.then((json) => initSavePoint(json)
)
        dataArr = [];//If the arr not empty because another real time
        dataArr.push(firstRow);// enter title row
    vectorSource.on('addfeature', function (e) {//The points received will appear on the screen
    flash(e.feature);
    });
    strReal.innerHTML="Stop Real Time!";
    document.getElementById('stopDrone').style.visibility = 'visible';
       myInterval=setInterval(checkingIfUpdated, 1000);//Sending to check every time if a glide point has been updated
      realTimeState=true;
    }
      else{ //A case where the user chose to stop real time
        realTimeState=false;
        drawLines();//Connecting the route of the remaining points
        strReal.innerHTML="Real Time!";
        document.getElementById('stopDrone').style.visibility = 'hidden';
        window.clearInterval(myInterval);//Stopping the test if a new point is reached
      }
    }

    document.getElementById("stopDrone").addEventListener("click", stopDroneInRealTime);//Listener to the situation where the visitor wanted to block a drone
    var ifStopDrone=false;
    //A function that updates a drone block
    function  stopDroneInRealTime() {
      ifStopDrone=true;
       }

       document.getElementById("cleanMap").addEventListener("click", cleanMap);//Listens if a user has chosen to clear the map
     //A function that handles cleaning the map
       function cleanMap() {
       document.getElementById('file').value= null;//Emptying the place where the file was loaded
       vectorLayer.getSource().clear();//Emptying the data from the vector layer
       dataArr = [];//Reset data set to save
       typeOfFile ="";//Reset the save file type
       showEmptyTable();
      }
      //Listens to a mouse click on a map
map.on('click', function (evt) {
   const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
     return feature;
   });
     if (feature) {
    var type= feature.getGeometry().getType();
     if(type=="Point"){
       var properties = feature.getProperties()
     extractPointDetails(properties);//Extracts the details of the page the user clicked on 
     showTable();//Shows a table with all the details of the point
      }
      } 
 });
 
 //Listener for mouseover map 
 map.on('pointermove', function (evt) {
   const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
     return feature;
   });
   if (feature) {
   var type= feature.getGeometry().getType();
    if(type=="Point"){
      const coordinate = evt.coordinate;
      var properties = feature.getProperties()
  extractPointDetails(properties); //Extracting the details of the point on which the user moved the mouse
  var str="Lat: "+pointDetails[18]+"<br>Lon: "+pointDetails[19]+"<br>AGL: "+pointDetails[20].toFixed(7)+"<br>Velocity: "+pointDetails[12]+"<br>Range: "+pointDetails[8]
   content.innerHTML = '<h1>Coordinate Details</h1><code>' + str + '</code>';
  overlay.setPosition(coordinate);//for show popup -a summary of the point details
     // showShortTable();//for sen station
     }
    } 
   else {
    overlay.setPosition(undefined);////to hide the popup
    closer.blur();
    return false;
 }
 });

 //Code for the animation of the points
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
          color: 'rgba(255, 10, 0, ' + opacity + ')',
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
