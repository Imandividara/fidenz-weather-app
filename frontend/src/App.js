import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import WeatherDashboard from './components/WeatherDashboard';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';

function App() {
  const { isLoading, isAuthenticated, user } = useAuth0();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white text-2xl flex items-center space-x-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-blue-900 bg-opacity-50 backdrop-blur-sm p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">☁️</div>
            <h1 className="text-white text-2xl font-bold">Weather App</h1>
          </div>
          
          {isAuthenticated && (
            <div className="flex items-center space-x-4">
              <div className="text-white">
                <span className="opacity-75">Welcome, </span>
                <span className="font-semibold">{user?.name}</span>
              </div>
              <LogoutButton />
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {!isAuthenticated ? (
          <div className="flex flex-col items-center justify-center min-h-[70vh]">
            <div className="text-center bg-white bg-opacity-10 backdrop-blur-md p-12 rounded-2xl shadow-2xl">
              <div className="text-6xl mb-6">🌦️</div>
              <h2 className="text-white text-4xl font-bold mb-4">
                Welcome to Weather App
              </h2>
              <p className="text-white text-lg mb-8 opacity-90">
                Please login to view real-time weather information from around the world
              </p>
              <LoginButton />
            </div>
          </div>
        ) : (
          <WeatherDashboard />
        )}
      </main>

      {/* Footer */}
      <footer className="text-center text-white opacity-50 py-6">
        <p>© 2025 Fidenz Technologies</p>
      </footer>
    </div>
  );
}

export default App;
