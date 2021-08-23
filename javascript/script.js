// Uso della getCurrentPosition per calcolare la posizione dell'utente

const successCallback = (position) => {
    console.log(position);
};

const errorCallback = (error) => {
    console.error(error);
};

navigator.geolocation.getCurrentPosition( successCallback, errorCallback, {
    enableHighAccuracy: true,
    timeout: 5000
})

// -----Inizializzazione dell'API di AQICN----------

let btn = document.getElementById("btn");

btn.onclick = () => {
    let city = document.getElementById("input").value;
    let apiKey = "635c09a92e47deb3be9fe65861ce2778b99705e7";
    let url = "https://api.waqi.info/feed/" + city + "/?token=" + apiKey;

    // Setto la richiesta da inviare al server
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.onload = function() {

        if(request.status >= 200 && request.status < 400) {
            var data = JSON.parse(this.response);
            console.log(data);
            var città = data.city.name;
            console.log(città);
        }
    }
    request.send();
}