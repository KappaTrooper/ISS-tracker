async function getISSLocation() {
  const endpoint = "http://api.open-notify.org/iss-now.json";
  const response = await axios.get(endpoint);
  console.log(response.data.iss_position);
  const positionObject = response.data.iss_position;
  return positionObject;
}

// Initialize and add the map
let map;

async function initMap(location) {
  // The location of Uluru
  const position = location;
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered at Uluru
  map = new Map(document.getElementById("map"), {
    zoom: 4,
    center: position,
    mapId: "DEMO_MAP_ID",
  });

  // The marker, positioned at Uluru
  const marker = new AdvancedMarkerElement({
    map: map,
    position: position,
    title: "ISS",
    
  });
}



initMap();

let issLatitude;
let isslongitude;

getISSLocation().then((location) => {
  const locationForGoogleMap = {};
  locationForGoogleMap.lat = Number(location.latitude);
  locationForGoogleMap.lng = Number(location.longitude);
  initMap(locationForGoogleMap);
  issLatitude = locationForGoogleMap.lat;
  isslongitude = locationForGoogleMap.lng;
});

// Click Event

let imageElement = document.querySelector('.header-image');



imageElement.addEventListener('click', function() {
  imageElement.classList.add('animate__animated', 'animate__wobble');

  imageElement.addEventListener('animationend', () => {
    imageElement.classList.remove('animate__animated', 'animate__wobble');
  });
});













//  Footer

let apiData = {
  latitude: "40.7128 N", 
  longitude: "74.0060 W",
  speed: "28,000 km/h",
  time: "2023-05-10T11:20:30Z"
}


document.querySelector(".footer-item__latitude").textContent = `Latitude: ${apiData.latitude}`;
document.querySelector(".footer-item__longitude").textContent = `Longitude: ${apiData.longitude}`;
document.querySelector(".footer-item__speed").textContent = `Speed: ${apiData.speed}`;
document.querySelector(".footer-item__time").textContent = `Time: ${apiData.time}`;

