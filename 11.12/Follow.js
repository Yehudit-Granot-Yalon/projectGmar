import Excel from 'exceljs';
import 'ol/ol.css';
import * as XLSX from 'xlsx';

globalThis.firstRow=['serial number', 'consec trck #', 'buffer#', 'WinN', 'plot number', 'East (x)', 'North (y)', 'Alt msl (z)', 'range', 'Vx', 'Vy', 'Vz', 'V', 'AZ AOA', 'EL AOA', 'MRC SNR', 'rMRC', 'dMRC', 'Latitude', 'Longtitude', 'Height(above ground)']

const input = document.getElementById('file');
input.onchange = async function (e) {
 if(realTimeState==true){
  alert("Stop and save real time before you go read drone tracking!")
  document.getElementById('file').value= null;
  return;
 }
 var placeToStart;//Setting the place from which to start reading data from the file
  this.file = e.target.files[0]
  const wb = new Excel.Workbook();
  const reader = new FileReader()
  reader.readAsArrayBuffer(this.file)
  reader.onload = () => {
    const buffer = reader.result;
    wb.xlsx.load(buffer).then(workbook => {
      workbook.eachSheet((sheet, id) => {
        console.log(reader );
        var startRow="";
        sheet.eachRow((row, rowIndex) => {
          for (var i = 1; i < 10; i++) {
            if (row.values[i] == "serial number") {
              placeToStart = rowIndex;
              startRow=i;
              if (row.values[i + 20] == "Height(above ground)")//Tracking recovery given the height has already been calculated
                typeOfFile  =readyFile
                else
                typeOfFile  = newFile//Unprocessed tracking file of the Sun Station company
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
        var arr=row_to_arr(row.values,startRow);//Extracting a line from the file into an ordered array
        console.log(arr);
          put_point_on_map(arr);//Sends the row for processing and main display
        }
          
          
          })

      }
      )
      drawLines();//for last group of point after rows stop
      console.log("type file",typeOfFile)
      if(typeOfFile==""){//End case of the file not according to the format
        alert("Invalid file");
        document.getElementById('file').value= null;
      }
    })
  }

}

//A case where the user saves the tracking
document.getElementById("writeToExel").addEventListener("click", DownloadFile);
function DownloadFile() {
 if( document.getElementById('file').value==""&&typeOfFile  != realTime)//If there is no data saved in the map, it is not downloaded
   {
  alert("no data in map");
   }
  else if (typeOfFile  == readyFile) {
    alert("The file already exists");
   }
   else{
dataArr.sort(sortFunction);//sort the point order to serial number
  var wb = XLSX.utils.book_new();
  var worksheet = XLSX.utils.aoa_to_sheet(dataArr);
  XLSX.utils.book_append_sheet(wb, worksheet, "page1");
  /* generate array buffer */
  var wbout = XLSX.write(wb, { type: "array", bookType: 'xlsx' });
  /* create data URL */
  let filename = "follow.xlsx";
  let blob = new Blob([wbout], { type: 'application/octet-stream' });
  let link = document.createElement("a");
  link.download = filename;
  link.href = window.URL.createObjectURL(blob);
  document.body.appendChild(link);
  link.click();
  setTimeout(() => {
    document.body.removeChild(link);
    window.URL.revokeObjectURL(link.href);
  }, 100);
}
}
//A function that sorts an array in chronological order
function sortFunction(a, b) {
  if (a[0] === b[0]) {
      return 0;
  }
  else {
      return (a[0] < b[0]) ? -1 : 1;
  }
}
//A function that sorts a row from a file into an array
globalThis.row_to_arr=function(row,startRow){
  var dataExcelPoint=[];
  var numValues;
  if(typeOfFile==newFile){
    numValues=18
  }
  if(typeOfFile==readyFile){
    numValues=21
  }
  for(var i=startRow;i<numValues+startRow;i++){
   dataExcelPoint.push(row[i]);
  
  }
console.log(dataExcelPoint);
return  dataExcelPoint;
}



















