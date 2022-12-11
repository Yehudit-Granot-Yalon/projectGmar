import 'ol/ol.css';
import proj4 from 'proj4';
import GeoTIFF, { fromUrl, fromUrls, fromArrayBuffer, fromBlob } from 'geotiff';

import { getTopRight, returnOrUpdate } from 'ol/extent';
import {Icon} from 'ol/style';
import * as XLSX from 'xlsx';


//globalThis.drawLines=function(){
  globalThis.pointDetails = []; //An array with all the details of the point on the map that the user clicked on
//A function that extracts the properties of the point into an array
globalThis.extractPointDetails=function(properties){
  var array = Object.values(properties);
for (var i = 1; i < 22; i++) {
      //  console.log(properties)
        pointDetails[i-1] = array[i];
     }
  }
//A method that calculates the height of the ground at a certain point
  globalThis.set_height=async function(lon,lat){ 
const response = await fetch("a1-30m-DEM.tif");
const arrayBuffer = await response.arrayBuffer();
const tiff = await fromArrayBuffer(arrayBuffer);
const imag = await tiff.getImage();
const bbox = imag.getBoundingBox(); 
const pixelWidth = imag.getWidth(); 
const pixelHeight = imag.getHeight(); 
const bboxWidth = bbox[ 2 ] - bbox[ 0 ]; 
const bboxHeight = bbox[ 3 ] - bbox[ 1 ];
const widthPct = ( lon - bbox[ 0 ] ) / bboxWidth;
const heightPct = ( lat - bbox[ 1 ] ) / bboxHeight;
const xPx = Math.floor( pixelWidth * widthPct );
const yPx = Math.floor( pixelHeight * ( 1 - heightPct ) );
const window = [ xPx, yPx, xPx + 1, yPx + 1 ];
const dataHeigth = await imag.readRasters( {window} );//A matrix with full details of the tile is returned
const height_above_ground=dataHeigth[0][0];
return  height_above_ground;
}
//the fuction return convert point in arr with lat and lon
globalThis.converting_to_wgs84=function(east, north){
 var firstProjection ="+proj=tmerc +lat_0=31.7343936111111 +lon_0=35.2045169444445 +k=1.0000067 +x_0=219529.584 +y_0=626907.39 +ellps=GRS80+"+
  "towgs84=-24.0024,-17.1032,-17.8444,-0.33077,-1.85269,1.66969,5.4248 +units=m +no_defs"
  var secondProjection = proj4("WGS84");
  var pointConvertArr=proj4(firstProjection,secondProjection,[east,north]);
  return pointConvertArr;
}