document.addEventListener('DOMContentLoaded', function () {
    fetchNews();
    fetchWeather();
});

function fetchNews() {
    const newsContainer = document.getElementById('news-container');
    const newsAPI = 'https://www.news24.com/'; 
    
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
            const url = `${weatherAPI}?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    const temperatures = data.hourly.temperature_2m;
                    const timeLabels = data.hourly.time; 
                    const weatherHTML = temperatures
                        .map((temp, index) => `<p>${timeLabels[index]}: ${temp}°C</p>`)
                        .join('');
                    weatherContainer.innerHTML = `
                        <h2>Hourly Temperatures</h2>
                        ${weatherHTML}
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
