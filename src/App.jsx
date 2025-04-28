import { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const API_KEY = 'dccd89f1281b8f160a5b38f474a7072a';
  const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

  const fetchWeather = async (e) => {
    e.preventDefault();
    setError('');
    setWeather(null); // Clear weather details on new fetch

    try {
      const response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      setWeather(data); // Update weather details
    } catch (err) {
      setError('City not found. Please try again.');
    }
  };

  const clearFields = () => {
    setCity(''); // Clear the input field
    setWeather(null); // Clear weather details
    setError(''); // Clear error message
  };

  return (
    <div className="app-container">
      <div className="weather-app">
        <h1>Weather App</h1>

        <form onSubmit={fetchWeather}>
          <input
            className="search-input"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
          />
          <button type="submit" className="search-button">
            Search
          </button>
          <button type="button" className="clear-button" onClick={clearFields}>
            Clear
          </button>
        </form>

        {error && <div className="error">{error}</div>}
        {weather && (
          <div className="weather-card">
            <h2 className="city-name">{weather.name}</h2>
            <div className="weather-info">
              <img
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
                className="weather-icon"
              />
              <div className="temperature">{Math.round(weather.main.temp)}°C</div>
              <div className="description">{weather.weather[0].description}</div>
              <div className="details">
                <div className="detail">Feels like: {Math.round(weather.main.feels_like)}°C</div>
                <div className="detail">Humidity: {weather.main.humidity}%</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
