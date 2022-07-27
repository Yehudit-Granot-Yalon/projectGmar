//import xlsxFile from 'read-excel-file/node'
//import Excel from 'exceljs';
//import Geometry from 'ol/geom/Geometry';
//import * as XLSX from 'xlsx/xlsx.mjs';
//import  XLSX from 'xlsx';
//import * as fs from 'fs';
//XLSX.set_fs(fs);

// /* load 'stream' for stream support */
//mport  Readable from 'stream';
//XLSX.stream.set_readable(Readable);

/* load the codepage support library for extended support with older formats  */
// import * as cpexcel from 'xlsx/dist/cpexcel.full.mjs';
// XLSX.set_cptable(cpexcel);

//const { parseObj } = require('parseexcel')
//  import {parseObj} from 'parseexcel';
//  alert("excel");
// const resArr = parseObj("file1.xlsx");
// AudioListener(resArr);
//readExcel1();
//readExcel2();\
//import ExcelJS from 'exceljs';


// var workbook = new Excel.Workbook(); 
// workbook.xlsx.readFile("file.xlsx")
//     .then(function() {
//         var worksheet = workbook.getWorksheet(sheet);
//         worksheet.eachRow({ includeEmpty: true }, function(row, rowNumber) {
//           console.log("Row " + rowNumber + " = " + JSON.stringify(row.values));
//         });
// });
// ExcelToJSON();

// function ExcelToJSON() {

//   this.parseExcel = function(file) {
//     var reader = new FileReader();

//     reader.onload = function(e) {
//       var data = e.target.result;
//       var workbook = XLSX.read(data, {
//         type: 'binary'
//       });

//       workbook.SheetNames.forEach(function(sheetName) {
//         // Here is your object
//         var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
//         var json_object = JSON.stringify(XL_row_object);
//         console.log(json_object);

//       })

//     };

//     reader.onerror = function(ex) {
//       console.log(ex);
//     };

//     reader.readAsBinaryString(file);
//   };
// };

// //readExcel3();
// function readExcel3(){
//     const wb = new ExcelJS.Workbook();
  
//   const fileName = "file";
  
//   wb.xlsx.readFile(fileName).then(() => {
      
//       const ws = wb.getWorksheet('Sheet1');
  
//       const c1 = ws.getColumn(1);
      
//       c1.eachCell(c => {
  
//           console.log(c.value);
//       });
  
//       const c2 = ws.getColumn(2);
      
//       c2.eachCell(c => {
  
//           console.log(c.value);
//       });
//   }).catch(err => {
//       console.log(err.message);
//   });
  
//   }
  
//   function readExcel1(){
//     xlsxFile('./file1.xlsx').then((rows) => {
//       rows.forEach((col)=>{
//               col.forEach((data)=>{
//                 alert(data)
//                 console.log(data);
//                 console.log(typeof data);
//           })
//       })
//       })
    
  
    
//   }
//   function readExcel2(){
//     // Reading our test file
//   const file = XLSX.readFile('file1.xlsx')
//   //var workbook = XLSX.readFile(filename, opts);
  
//   }