var map;
var service;
var infowindow;
function initMap() {
    var sydney = new google.maps.LatLng(-33.867, 151.195);
        map = new google.maps.Map(document.getElementById("map"), { 
        center: sydney,
        zoom: 15,
    });
    var request = {
        query: "Museum of Contemporary Art Australia",
        fields: ["name", "geometry"],
    };
    var request1 = {
        placeId: "ChIJ68aBlEKuEmsRHUA9oME5Zh0",
        fields: ["name", "rating", "formatted_phone_number", "geometry"],
    };
    var service = new google.maps.places.PlacesService(map);
    var contentString;
    service.findPlaceFromQuery(request, function (results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            contentString = results[0].geometry.location;
            for (var i = 0; i < results.length; i++) {
                const mark = new google.maps.Marker({
                    position: results[i].geometry.location,
                    map: map,
                });
                map.setCenter(results[0].geometry.location);
                console.log(results[0].geometry.location);
                infowindow = new google.maps.InfoWindow({
                    content: "<p>" + contentString + "<p>",
                });
                mark.addListener("click", () => {
                    infowindow.open({
                        anchor: mark,
                        map: map,
                        shouldFocus: false,
                    });
                });
            }
        }
    });
    service.getDetails(request1, function (results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
        console.log(results);
        contentString += "\n" + results;
        }
    });
}