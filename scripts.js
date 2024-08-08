document.addEventListener('DOMContentLoaded', function () {
    fetchWeather();
    fetchNews();
});

function fetchWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const weatherAPI = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`;

            fetch(weatherAPI)
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
        }, error => {
            console.error('Error getting location:', error);
        });
    } else {
        console.error('Geolocation is not supported by this browser.');
    }
}

function fetchNews() {
    const newsContainer = document.getElementById('news-container');
    const newsAPI = 'https://newsapi.org/v2/top-headlines?country=za&apiKey=32df689f5aab45c090599f0ec436e979';

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
