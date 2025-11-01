import React, { useState } from 'react';

const WeatherCard = ({ weather }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getWeatherIcon = (condition) => {
    const icons = {
      'Clear': '☀️',
      'Clouds': '☁️',
      'Rain': '🌧️',
      'Mist': '🌫️',
      'Snow': '❄️',
      'Drizzle': '🌦️',
      'Thunderstorm': '⛈️',
      'Fog': '🌫️',
      'Haze': '🌫️'
    };
    return icons[condition] || '🌤️';
  };

  const getCardColor = (condition) => {
    const colors = {
      'Clear': 'from-green-400 to-green-600',
      'Clouds': 'from-blue-400 to-blue-600',
      'Rain': 'from-orange-400 to-orange-600',
      'Mist': 'from-red-400 to-red-600',
      'Snow': 'from-blue-200 to-blue-400',
      'Drizzle': 'from-purple-400 to-purple-600',
      'Thunderstorm': 'from-gray-600 to-gray-800',
      'Fog': 'from-gray-500 to-gray-700',
      'Haze': 'from-yellow-400 to-yellow-600'
    };
    return colors[condition] || 'from-blue-400 to-blue-600';
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const getWindDirection = (degree) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(degree / 45) % 8;
    return directions[index];
  };

  return (
    <div 
      className={`bg-gradient-to-br ${getCardColor(weather.condition)} rounded-2xl p-6 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-2xl`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Card Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-white text-2xl font-bold">{weather.cityName}</h3>
          <p className="text-white text-sm opacity-80">
            {new Date().toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit',
              month: 'short',
              day: 'numeric'
            })}
          </p>
        </div>
        {isExpanded && (
          <button 
            className="text-white text-2xl hover:opacity-75 transition"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(false);
            }}
          >
            ×
          </button>
        )}
      </div>

      {/* Main Temperature Display */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="text-6xl">{getWeatherIcon(weather.condition)}</div>
          <div>
            <div className="text-6xl font-bold text-white">
              {Math.round(weather.temperature)}°C
            </div>
            <p className="text-white text-sm capitalize mt-2">{weather.description}</p>
          </div>
        </div>
      </div>

      {/* Temperature Range */}
      <div className="flex justify-between text-white text-sm mb-6 bg-white bg-opacity-20 rounded-lg p-3">
        <span>Min: {Math.round(weather.tempMin)}°C</span>
        <span>Max: {Math.round(weather.tempMax)}°C</span>
      </div>

      {/* Detailed Information - Only shown when expanded */}
      {isExpanded && (
        <div className="bg-gray-800 bg-opacity-50 rounded-lg p-4 space-y-3 text-white animate-fadeIn">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs opacity-75">Pressure</p>
              <p className="font-semibold">{weather.pressure}hPa</p>
            </div>
            <div>
              <p className="text-xs opacity-75">Humidity</p>
              <p className="font-semibold">{weather.humidity}%</p>
            </div>
            <div>
              <p className="text-xs opacity-75">Visibility</p>
              <p className="font-semibold">{weather.visibility.toFixed(1)}km</p>
            </div>
            <div>
              <p className="text-xs opacity-75">Wind Speed</p>
              <p className="font-semibold">{weather.windSpeed}m/s</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-3 border-t border-white border-opacity-20">
            <div className="flex items-center space-x-2">
              <span>🌅</span>
              <div>
                <p className="text-xs opacity-75">Sunrise</p>
                <p className="font-semibold">{formatTime(weather.sunrise)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span>🌇</span>
              <div>
                <p className="text-xs opacity-75">Sunset</p>
                <p className="font-semibold">{formatTime(weather.sunset)}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-center pt-3">
            <div className="flex items-center space-x-2">
              <span>🧭</span>
              <span className="font-semibold">
                {getWindDirection(weather.windDegree)} {weather.windSpeed}m/s
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherCard;
