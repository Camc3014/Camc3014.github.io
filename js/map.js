// //LEAFLET MAP
"use strict";
//FUNCTIONS TO HELP WITH HIGHLIGHTING OF BUROUGHS
function style_before() { //sets style while not hovered over
    return {
        color: "green",
        opacity: 0.1,
        fillOpacity: 0.15
    };
}
function style_after() { //sets style wile hovered over
    return {
        color: "green",
        weight: 5,
        stroke: "black",
        fillOpacity: 0.6
    };
}
function highlightFeature(e) { // set style while hover over
    var layer = e.target;
    layer.setStyle(style_after())
}
function resetHighlight(e) { // reset to default style while off
    var layer = e.target
    layer.setStyle(style_before())
}
// function zoomToFeature(e) {      //unused
//     map.fitBounds(e.target.getBounds());
// }
function highlightBuroughs(feature, layer) { //controls all highlighting functions
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        // click: zoomToFeature
    });
}
var mapFunction = {}; //declares function holder
//MAKE POPUPS AND ADD TEXT
mapFunction.addPopups = function (feature, layer) { //creates popups with site info
  if (feature.properties && feature.properties.address) {
    layer.bindPopup("<b>Address: </b>" + feature.properties.address+ 
                    "<br><b>Cost Estimate: </b> $"+parseInt(feature.properties.COST_ESTIMATE)+"</br>"+ 
                    "<b>Income Bracket: </b> "+ feature.properties.MEDHINC_CAT+ 
                    "<br><b>Percentage Green Roof Cover: </b>"+ ((((feature.properties.gr_area/feature.properties.bldg_area)* 100) / 100).toFixed(2)*100)+"%"+"</br>"+
                    "<b>Total Green Roof Area: </b>"+parseInt(feature.properties.gr_area)+" sq/ft"+
                    "<br><b> Roof Height: </b>"+parseInt(feature.properties.heightroof)+" ft"+"</br>")
  }
};
//MAKES MARKERS SMALL GREEN CIRCLES
mapFunction.pointToCircle = function (feature, latlng) { //makes the maerkers little green circles
  var geojsonMarkerOptions = {
    radius: 8,
    fillColor: "green",
    color: "green",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
  };
  var circleMarker = L.circleMarker(latlng, geojsonMarkerOptions);
  return circleMarker;
};
window.onload=function(){
    //CREATE BASEMAP
    let map = L.map('map').setView([40.69, -73.97], 10);
    var NYCmap = L.tileLayer('https://api.mapbox.com/styles/v1/dawo7390/cl9zygbct000114ofk5m565pk/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZGF3bzczOTAiLCJhIjoiY2w3cXIweXJjMDdpNzQxbzB5Zjdhajc4YiJ9.qPWM7J5wt_NNdCy-NxRuJw', {
        maxZoom: 18, minZoom: 10,
        attribution: '&copy; <a href=”https://www.mapbox.com/about/maps/”>Mapbox</a> &copy; <a href=”http://www.openstreetmap.org/copyright”>OpenStreetMap</a>'
        }).addTo(map);
    //CREATE BUROUGH HIGHLIGHTS ON MAP
    var nyc
    nyc = new L.geoJson(nycjson,{
        onEachFeature: highlightBuroughs,
        style: style_before
    }).addTo(map);
    
    //READ DATA FOR MARKERS
    var greenLayerGroup = L.geoJSON(greenroofgeojson, {
        onEachFeature: mapFunction.addPopups,
        pointToLayer: mapFunction.pointToCircle
    });

    //CREATE CLUSTERING EFFECT
    var clusters = L.markerClusterGroup();
    clusters.addLayer(greenLayerGroup);
    map.addLayer(clusters);
    map.fitBounds(greenLayerGroup.getBounds());
};