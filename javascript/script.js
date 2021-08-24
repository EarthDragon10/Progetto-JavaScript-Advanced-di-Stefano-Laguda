// Uso della getCurrentPosition per calcolare la posizione dell'utente
// ---- Creazione degli agganci -----
let button = document.getElementById("btn");


let geoUser = document.getElementById("geo");

let cityDisplay = document.getElementById("city");
let pmDisplay = document.getElementById("pm");
let aqiDisplay = document.getElementById("aqi");
let healthDisplay = document.getElementById("health");


// -----Inizializzazione dell'API -----

button.onclick = function() {

    let apiKey = "69ab781cd90f5b1d86bdd86a5be7105b2a946da3";
    let inputCity = document.getElementById("input").value;
    let url = "https://api.waqi.info/feed/" + inputCity + "/?token=" + apiKey;

    // Inizializzo la richiesta da inviare al server
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.onload = function() {

        if(request.status >= 200 && request.status < 400) {
            var data = JSON.parse(this.response);
            var cityUser = data.data.city.name;
            var pm25 = data.data.iaqi.pm25.v;
            var health = data.data.aqi;

            console.log(data);
            console.log(cityUser);
            console.log(pm25);
            console.log(health);

            cityDisplay.innerHTML = cityUser;
            pmDisplay.innerHTML = pm25;
            aqiDisplay.innerHTML = health;

            if(health >= 0 && health <= 50) {
                healthDisplay.innerHTML = "Good!";
            } else if(health >= 51 && health <= 100) {
                healthDisplay.innerHTML = "Moderate";
            } else if(health >= 101 && health <= 150) {
                healthDisplay.innerHTML = "Unhealthy for Sensitive Groups";
            } else if(health >= 151 && health <= 200) {
                healthDisplay.innerHTML = "Unhealthy";
            } else if(health >= 201 && health <= 300) {
                healthDisplay.innerHTML = "Very Unhealthy!";
            } else {
                healthDisplay.innerHTML = "Hazardous";
            }
        }
    };

    request.send();
}

// const successCallback = (position) => {
//     console.log(position);
//     var lat = `${pos.coords.latitude}`;
//     var lng = `${pos.coords.longitude}`;
// };

// const errorCallback = (error) => {
//     console.error(error);
// };

// navigator.geolocation.getCurrentPosition( successCallback, errorCallback, {
//     enableHighAccuracy: true,
//     timeout: 5000,
//     maximumAge: 0
// });



geoUser.onclick = function() {
    let apiKey = "69ab781cd90f5b1d86bdd86a5be7105b2a946da3";

    let lat;
    let lng;

    navigator.geolocation.getCurrentPosition((position) => {
        var crd = position.coords;

        lat = crd.latitude;
        lng = crd.longitude;

        let url = `https://api.waqi.info/feed/geo:${lat};${lng}/?token=${apiKey}`;

    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    
    request.onload = function() {

        if(request.status >= 200 && request.status < 400) {
            var data = JSON.parse(this.response);
            console.log(data);
            var cityUser = data.data.city.name;
            var pm25 = data.data.iaqi.pm25.v;
            var health = data.data.aqi;

            console.log(data);
            console.log(cityUser);
            console.log(pm25);
            console.log(health);

            cityDisplay.innerHTML = cityUser;
            pmDisplay.innerHTML = pm25;
            aqiDisplay.innerHTML = health;

            if(health >= 0 && health <= 50) {
                healthDisplay.innerHTML = "Good!";
            } else if(health >= 51 && health <= 100) {
                healthDisplay.innerHTML = "Moderate";
            } else if(health >= 101 && health <= 150) {
                healthDisplay.innerHTML = "Unhealthy for Sensitive Groups";
            } else if(health >= 151 && health <= 200) {
                healthDisplay.innerHTML = "Unhealthy";
            } else if(health >= 201 && health <= 300) {
                healthDisplay.innerHTML = "Very Unhealthy!";
            } else {
                healthDisplay.innerHTML = "Hazardous";
            }
        }
    };
    request.send();
    
    });

    
}


