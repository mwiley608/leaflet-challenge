// Class Activity 15.1.10
// Store our API endpoint as queryUrl.
let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL/
d3.json(queryUrl).then(function (data) {
    console.log(data);
    // Once we get a response, send the data.features object to the createFeatures function.
    createFeatures(data.features);
  });

// Class Activity 15.2.1
// Define a color function that will give earthquakes a different color based on its depth (deeper = darker color).
// READ ME - colorscheme https://colorbrewer2.org/#type=sequential&scheme=Purples&n=6
function chooseColor(depth) {
  if (depth < 10) return "#f2f0f7";
  else if (depth < 30) return "#dadaeb";
  else if (depth < 50) return "#bcbddc";
  else if (depth < 70) return "#9e9ac8";
  else if (depth < 90) return "#756bb1";
  else return "#54278f";
}

 // Class Activity 15.1.10
 function createFeatures(earthquakeData) {

  // Define a function that we want to run once for each feature in the features array.
  // Give each feature a popup that includes place,time, magnitude, and depth (third coordinate data) of the earthquake. 
  function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p><p>Magnitude: ${feature.properties.mag}</p><p>Depth: ${feature.geometry.coordinates[2]}</p>`);
  }
  // Create a GeoJSON layer that contains the features array on the earthquakeData object.
  // Run the onEachFeature function once for each piece of data in the array.
  let earthquakes = L.geoJSON(earthquakeData, {
      onEachFeature: onEachFeature
  });

  // Send our earthquakes layer to the createMap function/
  createMap(earthquakes);
}

function createMap(earthquakes) {

  // Create the base layers.
  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });
  
  // Create a baseMaps object.
  let baseMaps = {
    "Street Map": street,
    "Topographic Map": topo
  };
  
  // Create an overlay object to hold our overlay.
  let overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load.
  let myMap = L.map("map", {
      center: [37.09, -95.71],
      zoom: 5,
      layers: [street, earthquakes]
    });

    // Create a layer control.
    // Pass it our baseMaps and overlayMaps.
    // Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(myMap);
  }



 
// Class Activity 15.1.6
// Define a markerSize() function that will give each earthquake a different radius based on its magnitude (high magnitude = large size).
function markerSize(magnitude) {
  return magnitude * 500;
};


}


    
    
      // Layer to alter markers
      pointToLayer: function(feature, latlng) {

    // Styling each feature 
        let markers = {
            radius: markerSize(feature.properties.mag),
            color: "white",
        // Call the chooseColor() function to decide which color.
            fillColor: chooseColor(feature.geometry.coordinates[2]),
            fillOpacity: 0.5,
            weight: 1.5
        }
        return L.circle(latlng,markers);
     }
   }); 

    



    
  
    
  
 
  
 
  

// Create a legend to display information about our map.
let legend = L.control({
    position: "bottomright"
  });
  
  // When the layer control is added, insert a div with the class of "legend".
  legend.onAdd = function() {
    let div = L.DomUtil.create("div", "info legend"),
    depth = [-10, 10, 30, 50, 70, 90];
    return div;
  };
  // Add the info legend to the map.
  legend.addTo(myMap);

  //Class Activity 15.1.9
  for (let i = 0; i < earthquakeData.length; i++) {
   L.circle([earthquakeData[i].geometry.coordinates[1],earthquakeData[i].geometry.coordinates[0]], {
       stroke: false,
       illOpacity: 0.5,
       color: chooseColor(earthquakeData[i].geometry.coordinates[2]),
       fillColor: chooseColor(earthquakeData[i].geometry.coordinates[2]),
       radius: earthquakeData[i].properties.mag * 20000


};

