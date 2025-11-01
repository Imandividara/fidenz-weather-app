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

[Your Name]
University of Colombo School of Computing

## License

This project was created as an assignment for Fidenz Technologies.
\`\`\`








# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
