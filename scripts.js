function getWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function successCallback(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`)
        .then(response => response.json())
        .then(data => {
            const weatherContainer = document.getElementById('weather-container');
            weatherContainer.innerHTML = `
                <p>Temperature: ${data.hourly.temperature_2m[0]}°C</p>
            `;
        })
        .catch(error => {
            const weatherContainer = document.getElementById('weather-container');
            weatherContainer.innerHTML = '<p>Failed to load weather.</p>';
            console.error('Error fetching weather:', error);
        });
}

function errorCallback(error) {
    alert("Unable to retrieve your location.");
    console.error('Error getting location:', error);
}

document.addEventListener('DOMContentLoaded', function () {
    getWeather();
});
