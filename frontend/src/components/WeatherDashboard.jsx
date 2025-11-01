import React, { useState, useEffect, useCallback } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import WeatherCard from './WeatherCard';

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { getAccessTokenSilently } = useAuth0();

  // Wrap fetchWeatherData in useCallback to prevent re-creation on every render
  const fetchWeatherData = useCallback(async () => {
    try {
      setLoading(true);
      // FIX: Add audience parameter to get the correct token with API permissions
      const token = await getAccessTokenSilently({
        audience: 'https://weather-api.fidenz.com'
      });
      
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/weather`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      setWeatherData(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError('Failed to fetch weather data. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [getAccessTokenSilently]); // Add getAccessTokenSilently as dependency

  useEffect(() => {
    fetchWeatherData();
  }, [fetchWeatherData]); // Now includes fetchWeatherData

  const filteredWeather = weatherData.filter(weather =>
    weather.cityName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-white text-2xl flex items-center space-x-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          <span>Loading weather data...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="bg-red-500 bg-opacity-20 backdrop-blur-md p-8 rounded-lg">
          <p className="text-white text-xl mb-4">{error}</p>
          <button
            onClick={fetchWeatherData}
            className="bg-white text-red-600 px-6 py-2 rounded-lg hover:bg-opacity-90 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-white text-3xl font-bold mb-2">Weather Dashboard</h2>
        <p className="text-white opacity-75 mb-6">
          Current weather conditions around the world
        </p>
        
        {/* Search Bar */}
        <div className="max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 backdrop-blur-md text-white placeholder-white placeholder-opacity-60 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>
      
      {filteredWeather.length === 0 ? (
        <div className="text-center text-white text-xl">
          No cities found matching "{searchTerm}"
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredWeather.map((weather) => (
            <WeatherCard key={weather.cityCode} weather={weather} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WeatherDashboard;
