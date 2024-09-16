Project Overview
This project is a React application that uses axios to fetch user data and display various user-related statistics (e.g., performance, activity) through visualizations. The application supports two modes: development, using mock data, and production, fetching real data from an external backend.

The backend is hosted in a separate repository. See the Backend Information section for more details.

Backend Information
The backend for this project is hosted in a separate repository. To access and configure the backend, please refer to the appropriate repository. Ensure that the backend is running on http://localhost:3000 or adjust the API_BASE_URL in your configuration.

Environment Variables
This project uses environment variables to differentiate between development and production modes.

In development mode, mock data is used instead of making requests to the backend. This is controlled via the environment variable REACT_APP_ENV.
To configure environment variables:

Create a .env file in the root directory.
Add the following configuration to switch between development and production:
bash
Copier le code

# For development mode (using mock data)

REACT_APP_ENV=development

# For production mode (fetching real data)

REACT_APP_ENV=production
The REACT_APP_ENV variable is used in the application to decide whether to fetch data from the backend or use mock data.

Available Scripts
In the project directory, you can run:

yarn start
Runs the app in production mode.
Open http://localhost:3000 to view it in your browser.
The page will reload when you make changes.

yarn dev
Runs the app in development mode.
Open http://localhost:3000 to view it in your browser.
The page will reload when you make changes.

yarn test
Launches the test runner in the interactive watch mode.

yarn build
Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for best performance.

yarn eject
If you need to customize the configuration, run yarn eject to expose all configuration files. This is irreversible.

Learn More
To learn more about Create React App, check the Create React App documentation.
To learn more about React, visit the React documentation.
