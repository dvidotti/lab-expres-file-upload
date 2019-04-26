const directionsService = new google.maps.DirectionsService;
const directionsDisplay = new google.maps.DirectionsRenderer;

function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const myLoc = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      startMap(myLoc);
    }, () => {
      console.log('Error in the geolocation service.');
    });
  } else {
  // Browser says: Nah! I do not support this.
    console.log('Browser does not support geolocation.');
  }
}

function startMap(myLoc) {
  const map = new google.maps.Map(
    document.getElementById('map'),
    {
      zoom: 13,
      center: {
        lat: -23.547632,
        lng: -46.632803,
      },
    },
  );

  const myHousePosition = {
    lat: -23.577696,
    lng: -46.633835,
  }

  const myHouse = new google.maps.Marker({
    position: myHousePosition,
    map,
    title: "I'm here",
  });

  const myLocation = new google.maps.Marker({
    position: myLoc,
    map,
    title: "I'm here",
  });

  const directionRequest = {
    origin: myLoc,
    destination: myHousePosition,
    travelMode: 'TRANSIT',
  };

  directionsService.route(directionRequest, (response, status) => {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
  directionsDisplay.setMap(map);
}

getUserLocation();
