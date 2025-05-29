# 🌦️ My Weather App

A dynamic and interactive weather application that provides **real-time weather** and **air quality data** for any location. It features animated backgrounds based on current weather conditions for an engaging visual experience.

## ✨ Features

- 🌡 **Current Weather**: Real-time temperature, weather condition, and location display.

- 🌫 **Air Quality Index (AQI)**: Displays AQI based on current location or user input.
- 🌄 **Dynamic Backgrounds**: Animated canvas (sun, clouds, rain, snow) that changes with the weather.
- 📍 **Geolocation Support**: Automatically fetches the user’s location to display local weather.
- 🔁 **Unit Toggle**: Easily switch between Celsius and Fahrenheit.
- 📱 **Responsive Design**: Fully responsive layout optimized for mobile, tablet, and desktop.

## 🚀 Technologies Used

- **React.js** – Frontend framework.
- **Vite** – Lightning-fast build tool and dev server.
- **Tailwind CSS** – Utility-first CSS framework.
- **OpenWeatherMap API** – For weather, forecast, and AQI data.
- **lucide-react** – Modern SVG icons.

## ⚙️ Project Setup

Follow these steps to get the project running locally.

### 1. Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- npm (comes with Node.js) or [Yarn](https://classic.yarnpkg.com/lang/en/)
- [Git](https://git-scm.com/)

### 2. Installation

#### Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
cd YOUR_REPOSITORY_NAME
```

#### Install dependencies:

Using npm:

```bash
npm install
```

Or using Yarn:

```bash
yarn install
```

### 3. Setup Environment Variables

#### Get your OpenWeatherMap API key:

- Go to [OpenWeatherMap](https://openweathermap.org/api)
- Create an account or log in.
- Go to the **API keys** section in your profile.
- Copy your API key.

#### Create a `.env` file in the root directory:

```bash
touch .env
```

#### Add the following line to `.env`:

```
VITE_OPENWEATHER_API_KEY=YOUR_OPENWEATHER_API_KEY
```

> Replace `YOUR_OPENWEATHER_API_KEY` with your actual API key.

### 4. Run the Development Server

Using npm:

```bash
npm run dev
```

Using Yarn:

```bash
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app in your browser.

## 📂 Project Structure

```
my-weather-app/
├── public/
├── src/
│   ├── components/
│   ├── assets/
│   ├── App.jsx
│   └── main.jsx
├── .env
├── package.json
└── vite.config.js
```

## 📦 Build for Production

```bash
npm run build
# or
yarn build
```

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

## 🙌 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for their powerful API.
- [Lucide](https://lucide.dev/) for beautiful icon sets.
- [Tailwind CSS](https://tailwindcss.com/) for streamlined styling.
