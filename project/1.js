window.onload=init;
function init(){
var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.Stamen({layer:'watercolor',})
        }),
      new ol.layer.Tile({
        source: new ol.source.Stamen({layer:'terrain-labels',})
      //  source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([102.0, 0.5]),
      zoom: 10
    })
  });
  const exampleLayer=ol.layer.VectorImage({
      source: newol.source.Vector({
          url:'./data/polygons.geojson',
          format:new ol.format.geoJSON()
      }),
      visible: true,
title:'Exmple Polygans'
  })
map.addLayer(exampleLayer);
}

