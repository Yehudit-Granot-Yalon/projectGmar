import Excel from 'exceljs';
import 'ol/ol.css';
import Feature from 'ol/Feature';
import GeoJSON from 'ol/format/GeoJSON';
import Map from 'ol/Map';
import View from 'ol/View';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import Overlay from 'ol/Overlay';
import { easeOut } from 'ol/easing';
import { fromLonLat } from 'ol/proj';
import { getVectorContext } from 'ol/render';
import { unByKey } from 'ol/Observable';
import proj4 from 'proj4';
import MultiLineString from 'ol/geom/MultiLineString';

import Point from 'ol/geom/Point';
import { getTopRight, returnOrUpdate } from 'ol/extent';
import { Icon } from 'ol/style';
import * as XLSX from 'xlsx';
globalThis.typeOfFile = "";
globalThis.firstRow=['serial number', 'consec trck #', 'buffer#', 'WinN', 'plot number', 'East (x)', 'North (y)', 'Alt msl (z)', 'range', 'Vx', 'Vy', 'Vz', 'V', 'AZ AOA', 'EL AOA', 'MRC SNR', 'rMRC', 'dMRC', 'Latitude', 'Longtitude', 'Height(above ground)']

const input1 = document.getElementById('file');
input1.onchange = async function (e) {
 if(realTimeState==true){
  alert("Stop and save real time before you go read drone tracking!")
  document.getElementById('file').value= null;
  return;
 }
 
  //cleanMap();
  
  var placeToStart;
  this.file = e.target.files[0]
  const wb = new Excel.Workbook();
  const reader = new FileReader()
  reader.readAsArrayBuffer(this.file)
  reader.onload = () => {
    const buffer = reader.result;
    wb.xlsx.load(buffer).then(workbook => {
      workbook.eachSheet((sheet, id) => {
        
        var startRow="";
        sheet.eachRow((row, rowIndex) => {

         // var startRow;
          for (var i = 1; i < 10; i++) {
            if (row.values[i] == "serial number") {
             // row.values[i]=" rrrrr"
              placeToStart = rowIndex;
              startRow=i;
              if (row.values[i + 20] == "Height(above ground)")
                typeOfFile  =readyFile
                else
                typeOfFile  = newFile
              break;

            }
          }
          if (typeOfFile  ==newFile) {
            
            //function search start row
            if (rowIndex == placeToStart) {
             
              dataArr = [];//If the arr not empty because real time
              dataArr.push(firstRow);
console.log(firstRow);
            }
           
        
        }
        if (rowIndex > placeToStart && row.values[startRow] != undefined) {
        var arr=row_to_arr(row.values,startRow);
        console.log(arr);
          put_point_on_map3(arr);
        }
          
          
          })

      }
      )
      drawLines();//for last group of point after rows stop
    })
  }

}


function cleanMap() {

 // showEmptyTable();
  document.getElementById('file').value= null;
  vectorLayer.getSource().clear();
  dataArr = [];
  typeOfFile ="";
  showEmptyTable();
 // document.getElementById('tableDisplay').innerHTML="";
 	
}
document.getElementById("cleanMap").addEventListener("click", cleanMap);




//  document.getElementById("realTimel").addEventListener("click", actRealTime);
//     function actRealTime() {
//       var myInterval=setInterval(addRandomFeature, 5000);
//     }

document.getElementById("writeToExel").addEventListener("click", DownloadFile);
function DownloadFile() {

   if( document.getElementById('file').value==""&&typeOfFile  != realTime)
   {
  alert("no data in map");
   }
  else if (typeOfFile  == readyFile) {

 alert("The file already exists");
   }
   else{
dataArr.sort(sortFunction);//sort the point order to serial number
console.log(dataArr)

  var wb = XLSX.utils.book_new();
  var worksheet = XLSX.utils.aoa_to_sheet(dataArr);
  XLSX.utils.book_append_sheet(wb, worksheet, "page1");
  /* generate array buffer */
  var wbout = XLSX.write(wb, { type: "array", bookType: 'xlsx' });
  /* create data URL */
  var url = URL.createObjectURL(new Blob([wbout], { type: 'application/octet-stream' }));
  /* trigger download with chrome API */
  //chrome.downloads.download({ url: url, filename: "testsheet.xlsx", saveAs: true });
  let filename = "testsheet.xlsx";
  //let text = "Text of the file goes here.\n1";
  let blob = new Blob([wbout], { type: 'application/octet-stream' });
  let link = document.createElement("a");
  link.download = filename;
  //link.innerHTML = "Download File";
  link.href = window.URL.createObjectURL(blob);
  document.body.appendChild(link);
  link.click();
  setTimeout(() => {
    document.body.removeChild(link);
    window.URL.revokeObjectURL(link.href);
  }, 100);
}
}

function sortFunction(a, b) {
  if (a[0] === b[0]) {
      return 0;
  }
  else {
      return (a[0] < b[0]) ? -1 : 1;
  }
}
























