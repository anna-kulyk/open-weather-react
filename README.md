# Open Weather Forecast Web Page using React

A simple react application that displays real-time weather data for any location.

## [Check the live demo](https://open-weather-react.netlify.app/)

![Screenshot](https://raw.githubusercontent.com/anna-kulyk/open-weather-react/master/src/assets/images/openweather.jpg)

## Installation

### `npm i`

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.\
The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Technologies used

- React
- JavaScript, JSX
- CSS

## Features

- API integration: The project fetches weather data from the OpenWeatherMap API using an API key. This allows the user to receive real-time weather data for any location.

- Axios API: The project uses promise-based HTTP client Axios for interacting with APIs.

- Geolocation API: The JavaScript Geolocation API provides access to geographical location data associated with a user's device. This can be determined using GPS, WIFI, IP Geolocation and used for displaying weather information for user's current location.

- Dynamic location search: The project includes an input field that allows the user to search for weather in different locations. As the user types, the component updates the weather data to reflect the user's chosen location.

- Responsive design: The project uses CSS to create a responsive design that adjusts to different screen sizes and devices. This ensures that the weather forecast is readable and accessible on any device.

- Temperature unit conversion: The project includes an option to toggle between Fahrenheit and Celsius for temperature units. This provides flexibility for users who prefer one unit over the other.

- Component-based architecture: The project uses React's component-based architecture to organize the code into reusable, modular components. This makes it easy to add new features and maintain the codebase over time.

## Acknowledgements

- [OpenWeatherMap API](https://openweathermap.org/api)

## Author

👤 **Ganna Kulyk**

- Github: [@anna-kulyk](https://github.com/anna-kulyk)
- LinkedIn: [@Ganna Kulyk](https://linkedin.com/in/ganna-kulyk-b90273252)

This project was bootstrapped with [Vite](https://vitejs.dev/).
