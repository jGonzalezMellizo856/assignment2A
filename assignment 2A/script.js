document.addEventListener('DOMContentLoaded', function () {
    const inputField = document.getElementById('locationInput');
    const submitButton = document.getElementById('mybtn');

    submitButton.addEventListener('click', function () {
        const location = inputField.value;
        getWeather(location);
    });

    function getWeather(location) {
        const apiUrl = `http://api.weatherapi.com/v1/current.json?key=7f069434f4854b65b6541228240604&q=${location}=no`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const weatherData = {
                    city: data.location.name,
                    temperature: data.current.temp_c,
                    description: data.current.condition.text
                };
                displayWeather(weatherData);
            })
            .catch(error => {
                console.error('There was a problem fetching the weather data:', error);
            });
    }

    function displayWeather(weatherData) {
        const weatherDiv = document.getElementById('weather');
        weatherDiv.innerHTML = `
            <h2>${weatherData.city}</h2>
            <p>Temperature: ${weatherData.temperature}°C</p>
            <p>Description: ${weatherData.description}</p>
        `;
        weatherDiv.classList.add('weather-displayed'); // Add a class to the weather div
    }
    
});
