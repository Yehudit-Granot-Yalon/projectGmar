$(document).ready(init);
//alert("21");
map = new OpenLayers.Map("Map");
    var mapnik = new OpenLayers.Layer.OSM();
    map.addLayer(mapnik);

    var markers = new OpenLayers.Layer.Markers( "Markers" );
    map.addLayer(markers);
function orderPoint( lon, lat, height, velocity,direction){
    var zoom           = 18;
    alert(lat)
    $('#viewPointDetail').hide();

    var fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
    var toProjection   = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
    var position       = new OpenLayers.LonLat(lon, lat).transform( fromProjection, toProjection);
   // var position2       = new OpenLayers.LonLat(lon + 0.0001, lat+ 0.0001).transform( fromProjection, toProjection);

    
    markers.addMarker(new OpenLayers.Marker(position));
   // markers.addMarker(new OpenLayers.Marker(position2));
   var str="";
   // <div id = "divvar myHeight=0;
   str+= '<div id = "div1" class="view">lat:'+lat+'<br>lon:'+lon+'<br>height:'+height+'<br>velocity:'+velocity+'<br>direction:'+direction+'</div>'
  $("#viewPointDetail").html(str);
    
    
    map.setCenter(position, zoom);
   //document.getElementsByClassName("olAlphaImg")
     //var idPoint = $(this).attr("id");
    alert(idPoint);
     document.getElementById("OL_Icon_22").addEventListener("click", listenerPoint
     
        //  var str="";
       // <div id = "divvar myHeight=0;
     //  str+= '<div id = "div1" class="view">lat:'+lat+'<br>lon:'+lon+'<br>height:'+height+'<br>velocity:'+velocity+'<br>direction:'+direction+'</div>'
      //$("#viewPointDetail").html(str);
      //$("#viewPointDetail").show();
      
    );
     

}
function init() {
    var lat            = 47.35387;
    var lon            = 8.43609;
   var height=0;
   var velocity=0;
   var direction=0;
   
   // orderPoint( lon, lat,  heightCalculation(height), velocity,direction);
    for(i=47.35387;i<47.35399;i+=0.0001)
{
    orderPoint( lon, i,  heightCalculation(height), velocity,direction);
}
    
}
function heightCalculation(myHeight){//A function that calculates the height of a point above the surface
    return 0;
}
var listenerPoint = function (e) {
    alert("listenerPoint")
    var idPoint = $(this).attr("id");
    alert(id);
}
