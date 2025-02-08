/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
// Initialize and add the map
let map;
let map2;




async function initMap() {

  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  
  
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const currentPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      const antipodePosition = {
        lat: -(position.coords.latitude),
        lng: (180+position.coords.longitude)%360,
      };

      map = new Map(document.getElementById("map"), {
        zoom: 2,
        center: currentPosition,
        mapId: "DEMO_MAP_ID",
      });

      map2 = new Map(document.getElementById("map2"), {
        zoom: 2,
        center: antipodePosition,
        mapId: "DEMO_MAP_ID",
        
      });

      const marker = new AdvancedMarkerElement({
        map: map,
        position: currentPosition,
        title: "Current Location",
        
      });

      const marker2 = new AdvancedMarkerElement({
        map: map2,
        position: antipodePosition,
        title: "Antipode Location",
      });
      
      function moveMapToNewLocation(newLat, newLng) {

        map2.setCenter({ lat: newLat, lng: newLng }); 
      
      }
      
      document.getElementById('map').addEventListener('click', function() {
        console.log(map.getCenter().lat())
        let latt = -(map.getCenter().lat())
        let longg = (180 + map.getCenter().lng()) % 360
        moveMapToNewLocation(latt, longg); 
      
      });
      
      
    }, () => {
      handleLocationError(true, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, pos) {
  const infoWindow = new google.maps.InfoWindow();
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}

initMap();