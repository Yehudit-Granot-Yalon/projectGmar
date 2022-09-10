var pointDetails = [];   
function init() {
alert("init in point");
extractPointDetails() 
showTable();
}
function extractPointDetails(properties) {
  var array = Object.values(properties);
for (var i = 1; i < 22; i++) {
      //  console.log(properties)
        pointDetails[i-1] = array[i];
     }
  
    
}
function showTable() {
   
    var str = '<table id="tableOfCountry"';
    str += '<tr>'
    str += '<td><p>' + 'serial <br> number' + '</p></td><td><p>' + 'consec <br> trck' + '</p></td>'+'<td><p>' + '<br> buffer#'+'</p></td>'+'<td><p>' + ' <br> WinN'+'</p></td>'+'<td><p>' + ' plot <br> number'+'</p></td>'
    + '<td><p>' + ' <br> Eest (x)'+'</p></td>' +'<td><p>'+ ' <br> North (y)'+'</p></td>' +'<td><p>' + 'Alt msl <br> (z)'+'</p></td>' +'<td><p>'+ ' <br> range'+'</p></td>'  +'<td><p>'+ ' <br> Vx'+'</p></td>' +'<td><p>' + ' <br> Vy'+'</p></td>' +'<td><p>' + ' <br> Vz'+'</p></td>'
    +'<td><p>' + ' <br>V '+'</p></td>' +'<td><p>' + ' <br>AZ AOA '+'</p></td>' +'<td><p>' + ' <br>EL AOA'+'</p></td>' +'<td><p>' + 'MRC <br>SNR '+'</p></td>' +'<td><p>' + ' <br>rMRC '+'</p></td>'+'<td><p>' + ' <br>dMRC '+'</p></td>' +'<td><p>' + ' <br>Latitude '
    +'<td><p>' + ' <br>Longtitude '+'</p></td>'+'<td><p>' + 'Height <br>(above ground) '+'</p></td>' ;
    str += '</tr>'
    str += '<tr>'//second row of details
      for (var i = 0; i < 21; ++i) {
        str += '<td><p>' + pointDetails[i] + '</p></td>' ;
      }
    str += '</tr>'
    var tebleDisplayId = document.getElementById("tableDisplay");
    tebleDisplayId.innerHTML=str;
   
    }
    function showShortTable() {
      var str ="";
      var tebleDisplayId = document.getElementById("tableDisplay");
      tebleDisplayId.innerHTML=str;
      str = '<table id="shortTableDisplay"';
      str += '<tr>'
      str += '<td><p>'  + ' <br> Eest (x)' + '</p></td><td><p>' +  ' <br> North (y)'+ '</p></td>'+'<td><p>' + ' <br> V'+'</p></td>'+'<td><p>' + ' <br> range'+'</p></td>'+'<td><p>' +  'Alt msl <br> (z)'+'</p></td>'
      + '<td><p>' + 'Height <br>(above ground) '+'</p></td>' +'<td><p>'+ ' <br>AZ AOA '+'</p></td>' +'<td><p>' + 'Alt msl <br> (z)'+'</p></td>' ;
      str += '</tr>'
      str += '<tr>'//second row of details
      str += '<td><p>' + pointDetails[5] + '</p></td>' ;
      str += '<td><p>' + pointDetails[6] + '</p></td>' ;
      str += '<td><p>' + pointDetails[12] + '</p></td>' ;
      str += '<td><p>' + pointDetails[8] + '</p></td>' ;
      str += '<td><p>' + pointDetails[7] + '</p></td>' ;
      str += '<td><p>' + pointDetails[20] + '</p></td>' ;
      str += '<td><p>' + pointDetails[13] + '</p></td>' ;
      str += '<td><p>' + pointDetails[14] + '</p></td>' ;
       // for (var i = 0; i < 21; ++i) {
         // str += '<td><p>' + pointDetails[i] + '</p></td>' ;
       // }
      str += '</tr>'
      var tebleDisplayId = document.getElementById("tableDisplay");
      tebleDisplayId.innerHTML=str;
      let lon=pointDetails[19];
      let lat=pointDetails[18];
   
      }