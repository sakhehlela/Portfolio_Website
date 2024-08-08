document.addEventListener('DOMContentLoaded', function () {
    getLocationAndWeather();
    fetchNews();
});

function getLocationAndWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
        console.error("Geolocation is not supported by this browser.");
    }

    function successCallback(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        fetchWeather(latitude, longitude);
    }

    function errorCallback(error) {
        console.error("Error fetching geolocation:", error);
        const weatherContainer = document.getElementById('weather-container');
        weatherContainer.innerHTML = '<p>Failed to load weather.</p>';
    }
}

function fetchWeather(latitude, longitude) {
    const weatherContainer = document.getElementById('weather-container');
    const weatherAPI = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=apparent_temperature&timezone=Africa%2FCairo`;
    const reverseGeocodeAPI = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;

    Promise.all([
        fetch(weatherAPI).then(response => response.json()),
        fetch(reverseGeocodeAPI).then(response => response.json())
    ])
    .then(([weatherData, locationData]) => {
        const locationName = locationData.locality || locationData.city || "Unknown Location";
        const temperature = weatherData.current.apparent_temperature;
        weatherContainer.innerHTML = `
            <h3>Weather in ${locationName}</h3>
            <p>Temperature: ${temperature}°C</p>
        `;
    })
    .catch(error => {
        weatherContainer.innerHTML = '<p>Failed to load weather.</p>';
        console.error('Error fetching weather:', error);
    });
}

function fetchNews() {
    const newsContainer = document.getElementById('news-container');
    const newsAPI = 'https://newsdata.io/api/1/news?apikey=pub_50370d7240f45620abdbde99f706edb2aebac&country=za';

    fetch(newsAPI)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (!data.results || data.results.length === 0) {
                newsContainer.innerHTML = '<p>No news articles found.</p>';
                return;
            }
            data.results.forEach(article => {
                const articleElement = document.createElement('div');
                articleElement.classList.add('article');
                articleElement.innerHTML = `
                    <h3>${article.title}</h3>
                    <p>${article.description}</p>
                    <a href="${article.url}" target="_blank">Read more</a>
                `;
                newsContainer.appendChild(articleElement);
            });
        })
        .catch(error => {
            newsContainer.innerHTML = `<p>Failed to load news: ${error.message}</p>`;
            console.error('Error fetching news:', error);
        });
}

