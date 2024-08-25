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
    const weatherAPI = 'https://api.openweathermap.org/data/2.5/weather?q=YourCity&appid=YOUR_API_KEY';

    fetch(weatherAPI)
        .then(response => response.json())
        .then(data => {
            weatherContainer.innerHTML = `
                <p>Temperature: ${(data.main.temp - 273.15).toFixed(2)}°C</p>
                <p>Weather: ${data.weather[0].description}</p>
                <p>Humidity: ${data.main.humidity}%</p>
            `;
        })
        .catch(error => {
            weatherContainer.innerHTML = '<p>Failed to load weather.</p>';
            console.error('Error fetching weather:', error);
        });
}
