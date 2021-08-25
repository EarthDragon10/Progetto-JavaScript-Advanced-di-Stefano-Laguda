// ►►►► Sezione HTML realizzata con JavaScript ◄◄◄◄

// 1. Creazione dell'Header

let mainSite = document.createElement("main");
let headerSite = document.createElement("header");
let sectionSite = document.createElement("section");

let h1 = document.createElement("h1");
let p = document.createElement("p");

h1.innerHTML = "Enter city or country";
p.innerHTML = "Check the air pollution in your city/country";

document.body.prepend(mainSite);
mainSite.prepend(sectionSite);
sectionSite.prepend(headerSite);
headerSite.prepend(h1);
h1.after(p);

sectionSite.classList.add("src");

// 2. Creazione del Form
let formSite = document.createElement("form");
let inputSite = document.createElement("input");
let btnSearch = document.createElement("button");
let btnGeo = btnSearch.cloneNode(false);
let iconItemSearch = document.createElement("i");
let iconItemGeo = iconItemSearch.cloneNode(false);

headerSite.after(formSite);
formSite.prepend(inputSite);
inputSite.after(btnSearch);
btnSearch.append(iconItemSearch);
btnSearch.after(btnGeo);
btnGeo.append(iconItemGeo);


inputSite.setAttribute("id","input");
inputSite.setAttribute("type","text");
inputSite.setAttribute("placeholder", "Search for your city");

btnSearch.setAttribute("id", "btn");
btnSearch.setAttribute("type", "button");
iconItemSearch.classList.add("fas");
iconItemSearch.classList.add("fa-search");

btnGeo.setAttribute("id", "geo");
btnGeo.setAttribute("type", "button");
iconItemGeo.classList.add("fas");
iconItemGeo.classList.add("fa-map-marked-alt");

// 3. Creazione della sezione che mostra i risultati della ricerca

let sectionShow = sectionSite.cloneNode(false);

let divSearch = document.createElement("div");

let divCity = divSearch.cloneNode(false);
let h3City = document.createElement("h3");
let pCity = document.createElement("p");

let divPM = divCity.cloneNode(false);
let h3PM = document.createElement("h3");
let pPM = document.createElement("p");

let divAQI = divPM.cloneNode(false);
let h3AQI = document.createElement("h3");
let pAQI = document.createElement("p");

let divHealth = divAQI.cloneNode(false);
let h3Health = document.createElement("h3");
let pHealth = document.createElement("p");

let divLine1 = divSearch.cloneNode(false);
divLine1.classList.add("line");
let divLine2 = divLine1.cloneNode(true);
let divLine3 = divLine2.cloneNode(true);

sectionSite.after(sectionShow);
sectionShow.classList.add("showRes");

sectionShow.prepend(divSearch);
divSearch.classList.add("search");

divSearch.prepend(divCity);
divCity.prepend(h3City);
h3City.innerHTML = "City";
h3City.after(pCity);
pCity.setAttribute("id", "city");
pCity.innerHTML = "Milan";

divCity.after(divLine1);

divLine1.after(divPM);
divPM.prepend(h3PM);
h3PM.innerHTML = "Fine dust grade";
h3PM.after(pPM);
pPM.setAttribute("id", "pm");
pPM.innerHTML = "85";

divPM.after(divLine2);

divLine2.after(divAQI);
divAQI.prepend(h3AQI);
h3AQI.innerHTML = "Air quality index";
h3AQI.after(pAQI);
pAQI.setAttribute("id", "aqi");
pAQI.innerHTML = "85";

divAQI.after(divLine3);

divLine3.after(divHealth);
divHealth.prepend(h3Health);
h3Health.innerHTML = "Health note";
h3Health.after(pHealth);
pHealth.setAttribute("id", "health");
pHealth.innerHTML = "Moderate";




// ---- Creazione degli agganci -----
let button = document.getElementById("btn");


let geoUser = document.getElementById("geo");

let cityDisplay = document.getElementById("city");
let pmDisplay = document.getElementById("pm");
let aqiDisplay = document.getElementById("aqi");
let healthDisplay = document.getElementById("health");


// -----Input Classico -----

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


//------ Geolocalizzazione ------

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


