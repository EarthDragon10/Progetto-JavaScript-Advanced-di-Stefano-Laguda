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