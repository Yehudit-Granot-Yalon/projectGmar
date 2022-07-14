//import xlsxFile from 'read-excel-file/node'
import ExcelJS from 'exceljs';
//import Geometry from 'ol/geom/Geometry';
import * as XLSX from 'xlsx/xlsx.mjs';
import * as fs from 'fs';
XLSX.set_fs(fs);

// /* load 'stream' for stream support */
import  Readable from 'stream';
XLSX.stream.set_readable(Readable);

/* load the codepage support library for extended support with older formats  */
// import * as cpexcel from 'xlsx/dist/cpexcel.full.mjs';
// XLSX.set_cptable(cpexcel);
alert("excel");
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