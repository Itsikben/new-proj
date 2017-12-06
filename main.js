console.log('bsd')


// var marker = new google.maps.Marker({
//     position: { lat: lat, lng: lng },
//     map: map,
//     title: 'Hello World!'
// });


// var map;
// function initMap() {
//     map = new google.maps.Map(document.getElementById('map'), {
//         center: { lat: -34.397, lng: 150.644 },
//         zoom: 8
//     });
// }

function getPosition() {
    if (!navigator.geolocation) {
        alert("HTML5 Geolocation is not supported in your browser.");
        return;
    }

    // One shot position getting or continus watch
    navigator.geolocation.getCurrentPosition(showLocation, handleLocationError);
    //navigator.geolocation.watchPosition(showLocation, handleLocationError);
}

function hendelInput() {

    var adress = document.querySelector('#mySearch').value;
    console.log(adress)
    var prmInput = fetch(` https://maps.googleapis.com/maps/api/geocode/json?address=${adress}&key=AIzaSyDBa2XUIja_rS8DgY8RIUYSwbB8gu4x7M0`);


    prmInput
        .then(function (res) {
            return res.json();

        })
        .then(function (data) {
            console.log(data.results[0].geometry.location)
            var lat = data.results[0].geometry.location.lat;
            var lng = data.results[0].geometry.location.lng;
            setAdressByCord(lat, lng)
            setWeatherByCord(lat, lng)
             initMap(lat, lng)

        })


}

function showLocation(position) {
    console.log(position)
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    initMap(lat, lng)
    setAdressByCord(lat, lng)
    setWeatherByCord(lat, lng)
}


function setAdressByCord(lat, lng) {

    var prmAdress = fetch(` https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyDBa2XUIja_rS8DgY8RIUYSwbB8gu4x7M0`);


    prmAdress
        .then(function (res) {
            return res.json();

        })
        .then(function (data) {
            var adress = data.results[0].formatted_address;
            document.querySelector('.Descriptive-location').innerHTML = adress

        })

}

function setWeatherByCord(lat, lon) {

    var prmWeather = fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=708c21a8fbdeaaa76a8ddc82654b4283&units=metric`);


    prmWeather
        .then(function (res) {
            return res.json();

        })
        .then(function (data) {
            var weather = (data.weather[0].description + data.main.temp);
            document.querySelector('.weather').innerHTML = `The weather is: <br> ${weather}`
            // console.log(data.weather[0].description)
            // console.log(data.main.temp)

        })

}

function handleLocationError() {
    console.log('location not faund')
}


