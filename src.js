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
    const input = document.getElementById('pac-input');
    var southwest = new google.maps.LatLng(-34, 152);
    var northeast = new google.maps.LatLng(-32, 154);
    // const autocomplete = new google.maps.places.Autocomplete(place_id_input,{
    //     fields:["place_id","geometry","formatted_address","name"],
    // });
    var sydneyBounds = new google.maps.LatLngBounds(southwest,northeast);
    // console.log(southwest);
    // console.log(northeast);
    // console.log(sydneyBounds);
    // autocomplete.setBounds(southwest,northeast);
    var autocompleteOptions = {
        bounds:sydneyBounds,
        fields:["place_id","geometry","formatted_address","name"],
        // strictBounds:true,
    }
    const autocomplete = new google.maps.places.Autocomplete(input,autocompleteOptions);
    const marker = new google.maps.Marker({
        position:{
            lat:-25,
            lng:153,
        },
        map: map,
    });
    // const place = autocomplete.getPlace();
    marker.addListener('click',()=>{
        infowindow.open(map,marker);
    });
    input.addEventListener('input',function(){
        // infowindow.close();
        const place = autocomplete.getPlace();
        if(!place.geometry || !place.geometry.location){
            return;
        }
        if(place.geometry.viewport){
            map.fitBounds(place.geometry.viewport);
        }
        else{
            map.setCenter(place.geometry.location);
            map.setZoom(17);
        }
        marker.setPlace({
            placeId:place.place_id,
            location:place.geometry.location,
        });
        console.log(place.place_id);
        console.log(place.geometry.location);
    });
    // service.findPlaceFromQuery(request, function (results, status) {
    //     if (status === google.maps.places.PlacesServiceStatus.OK) {
    //         contentString = results[0].geometry.location;
    //         for (var i = 0; i < results.length; i++) {
    //             const mark = new google.maps.Marker({
    //                 position: results[i].geometry.location,
    //                 map: map,
    //             });
    //             map.setCenter(results[0].geometry.location);
    //             console.log(results[0].geometry.location);
    //             infowindow = new google.maps.InfoWindow({
    //                 content: "<p>" + contentString + "<p>",
    //             });
    //             mark.addListener("click", () => {
    //                 infowindow.open({
    //                     anchor: mark,
    //                     map: map,
    //                     shouldFocus: false,
    //                 });
    //             });
    //         }
    //     }
    // });
    // service.getDetails(request1, function (results, status) {
    //     if (status === google.maps.places.PlacesServiceStatus.OK) {
    //     console.log(results);
    //     contentString += "\n" + results;
    //     }
    // });
}