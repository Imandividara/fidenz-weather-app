# Weather Application

Full-stack weather application built with Spring Boot, React, Auth0 authentication, and OpenWeatherMap API.

## Features

- 🔐 Secure authentication with Auth0
- 🌦️ Real-time weather data from OpenWeatherMap
- 🎨 Modern UI with React and Tailwind CSS
- 🔍 Search and filter cities
- 📱 Responsive design
- ⚡ Caching for improved performance

## Tech Stack

### Backend
- Java 17
- Spring Boot 3.x
- Spring Security (OAuth2)
- Maven
- Caffeine Cache

### Frontend
- React 18
- Auth0 React SDK
- Axios
- Tailwind CSS
- React Router

## Prerequisites

- Java 17 or higher
- Node.js 18+ and npm
- Maven 3.6+
- Auth0 account
- OpenWeatherMap API key

## Setup Instructions

### 1. Clone the Repository

\`\`\`bash
git clone https://github.com/Imandividara/fidenz-weather-app.git
cd fidenz-weather-app
\`\`\`

### 2. Backend Setup

#### Configure Auth0

1. Create an Auth0 account at https://auth0.com
2. Create a new **API** with identifier: `https://weather-api.fidenz.com`
3. Enable **RBAC** and **Add Permissions in the Access Token**
4. Create a new **Application** (Single Page Application)
5. Note your **Domain** and **Client ID**

#### Configure OpenWeatherMap

1. Sign up at https://openweathermap.org
2. Get your API key from the API keys section
3. Wait 5-10 minutes for activation

#### Update application.properties

Edit `backend/src/main/resources/application.properties`:

\`\`\`properties
openweather.api.key=YOUR_OPENWEATHERMAP_API_KEY
spring.security.oauth2.resourceserver.jwt.issuer-uri=https://YOUR_AUTH0_DOMAIN/
spring.security.oauth2.resourceserver.jwt.audiences=https://weather-api.fidenz.com
\`\`\`

#### Run Backend

\`\`\`bash
cd backend
mvn clean install
mvn spring-boot:run
\`\`\`

Backend will start on http://localhost:8080

### 3. Frontend Setup

#### Create .env file

Create `frontend/.env`:

\`\`\`
REACT_APP_AUTH0_DOMAIN=YOUR_AUTH0_DOMAIN
REACT_APP_AUTH0_CLIENT_ID=YOUR_AUTH0_CLIENT_ID
REACT_APP_AUTH0_AUDIENCE=https://weather-api.fidenz.com
REACT_APP_API_URL=http://localhost:8080/api
\`\`\`

#### Install Dependencies & Run

\`\`\`bash
cd frontend
npm install
npm start
\`\`\`

Frontend will start on http://localhost:3000

### 4. Create Test User

1. Go to Auth0 Dashboard → User Management → Users
2. Create user with email: `careers@fidenz.com`
3. Set password: `Pass#fidenz`
4. Verify email (toggle in user settings)

## Usage

1. Navigate to http://localhost:3000
2. Click "Log In"
3. Enter credentials: `careers@fidenz.com` / `Pass#fidenz`
4. View weather data for 8 cities worldwide
5. Use search bar to filter cities

## Project Structure

\`\`\`
weather-app/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/fidnez/weather_app/
│   │   │   │   ├── config/         # Security & CORS config
│   │   │   │   ├── controller/     # REST endpoints
│   │   │   │   ├── service/        # Business logic
│   │   │   │   ├── model/          # Data models
│   │   │   │   └── dto/            # Data transfer objects
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       └── cities.json
│   └── pom.xml
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── index.js
    │   └── App.js
    ├── package.json
    └── .env
\`\`\`

## API Endpoints

- `GET /api/weather` - Get weather for all cities
- `GET /api/weather/{cityCode}` - Get weather for specific city

## Security

- Auth0 OAuth2 authentication
- JWT token validation
- CORS protection
- Secure API key storage

## Author

Imandi Muthugala
University of Colombo School of Computing

## License

This project was created as an assignment for Fidenz Technologies.
\`\`\`







