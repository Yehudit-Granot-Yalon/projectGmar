import Excel from 'exceljs';
import 'ol/ol.css';
import * as XLSX from 'xlsx';

// Global variable holding an array representing the header row of the Excel sheet
globalThis.firstRow=['serial number', 'consec trck #', 'buffer#', 'WinN', 'plot number', 'East (x)', 'North (y)', 'Alt msl (z) ', 'range', 'Vx', 'Vy', 'Vz', 'V', 'AZ AOA', 'EL AOA', 'MRC SNR', 'rMRC', 'dMRC', 'Latitude', ' Longitude', 'Height(above ground)']

// Get the file input field and add an event listener to it
const input = document.getElementById('file');
input.onchange = async function (e) {

  // Check if real-time tracking is currently active and if so, stop and save before continuing
  if(realTimeState==true){
   alert("Stop and save real time before you go read drone tracking!")
   document.getElementById('file').value= null;
   return;
  }

  // Variables to track where to start reading data from the file and the type of file being read
  var placeToStart;
  var typeOfFile = "";

  // Load the file that the user chooses
  this.file = e.target.files[0]
  const wb = new Excel.Workbook();
  const reader = new FileReader()
  reader.readAsArrayBuffer(this.file)
  reader.onload = () => {
    const buffer = reader.result;
    wb.xlsx.load(buffer).then(workbook => {
      // Loop through each sheet in the workbook
      workbook.eachSheet((sheet, id) => {
        var startRow="";
        sheet.eachRow((row, rowIndex) => {
          // Check if the current row is the header row, which should contain the "serial number" column
          for (var i = 1; i < 10; i++) {
            if (row.values[i] == "serial number") {
              placeToStart = rowIndex;
              startRow=i;
              if (row.values[i + 20] == "Height(above ground)")
                typeOfFile = readyFile
              else
                typeOfFile = newFile
              break
            }
          }
          if (typeOfFile ==newFile) {
            // If the array holding the data is not empty because of real-time tracking, push the first row to it
            if (rowIndex == placeToStart) {
              dataArr = [];
              dataArr.push(firstRow);
            }
          }
          // If the current row is not the header row and has valid data, extract the data into an array and send it for processing
          if (rowIndex > placeToStart && row.values[startRow] != undefined) {
            var arr=row_to_arr(row.values,startRow);
            put_point_on_map(arr);
          }
        })
      })
      drawLines(); // draw the lines connecting the points on the map
      if(typeOfFile==""){
        alert("Invalid file"); // Alert the user if the file is not according to the expected format
        document.getElementById('file').value= null;
      }
    })
  }

}

// Function to download the tracked data as an Excel file
document.getElementById("writeToExel").addEventListener("click", DownloadFile);
function DownloadFile() {
  if( document.getElementById('file').value==""&&typeOfFile != realTime)//If there is no data saved in the map, it is not downloaded
    {
   alert("no data in map");
    }
   else if (typeOfFile == readyFile) {
     alert("
