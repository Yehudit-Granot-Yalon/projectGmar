var pointDetails = [];   
function init() {
alert("init in point");
extractPointDetails() 
showTable();
}
function extractPointDetails(properties) {
  var object = { 0: 'John', 1: 'Tim', 2: 'Matt' }, 
  array = Object.values(object);
  
console.log(array);
array = Object.values(properties);
for (var i = 1; i < 22; i++) {
    
      console.log(properties)
        
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
    alert("show table")
    }