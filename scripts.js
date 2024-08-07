document.addEventListener('DOMContentLoaded', function () {
    fetchNews();
    fetchWeather();
});

function fetchNews() {
    const newsContainer = document.getElementById('news-container');
    const newsAPI = 'https://example-news-api.com/latest-news'; 
    
    fetch(newsAPI)
        .then(response => response.json())
        .then(data => {
            data.articles.forEach(article => {
                const articleElement = document.createElement('div');
                articleElement.innerHTML = `
                    <h3>${article.title}</h3>
                    <p>${article.description}</p>
                    <a href="${article.url}" target="_blank">Read more</a>
                `;
                newsContainer.appendChild(articleElement);
            });
        })
        .catch(error => {
            newsContainer.innerHTML = '<p>Failed to load news.</p>';
            console.error('Error fetching news:', error);
        });
}

function fetchWeather() {
    const weatherContainer = document.getElementById('weather-container');
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const weatherAPI = 'https://api.open-meteo.com/v1/forecast';
            const url = `${weatherAPI}?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    const weather = data.current_weather;
                    weatherContainer.innerHTML = `
                        <p>Temperature: ${weather.temperature_2m}°C</p>
                        <p>Weather: ${getWeatherDescription(weather.weathercode)}</p>
                        <p>Wind Speed: ${weather.windspeed_10m} km/h</p>
                    `;
                })
                .catch(error => {
                    weatherContainer.innerHTML = '<p>Failed to load weather.</p>';
                    console.error('Error fetching weather:', error);
                });
        }, error => {
            weatherContainer.innerHTML = '<p>Failed to get location.</p>';
            console.error('Error getting location:', error);
        });
    } else {
        weatherContainer.innerHTML = '<p>Geolocation is not supported by this browser.</p>';
    }
}

function getWeatherDescription(code) {
    const descriptions = {
        0: 'Clear sky',
        1: 'Mainly clear',
        2: 'Partly cloudy',
        3: 'Overcast',
        45: 'Fog',
    };
    return descriptions[code] || 'Unknown';
}
