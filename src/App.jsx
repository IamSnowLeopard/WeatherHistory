import React, { useState, useEffect } from "react";
import axios from "axios";
import StateSelector from "./components/StateSelector";
import WeatherDisplay from "./components/WeatherDisplay";

//Functional component of the App
function App() {
  //Manage state for set location, weather data, years
  const [selectedLocation, setSelectedLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [middayWeatherData, setMiddayWeatherData] = useState({
    current: {},
    historical: {},
  });
  const currentYear = new Date().getFullYear();
  const yearsAgo = [1, 5, 10, 20]; // Years past to fetch data for

  //API call to Open Meteo using axios
  useEffect(() => {
    const { latitude, longitude } = selectedLocation;
    if (latitude && longitude) {
      // Directly begin the async operation without declaring fetchWeatherData
      // Fetch current midday data
      const fetchCurrentMiddayWeatherData = async () => {
        const currentApiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,wind_speed_10m`;
        try {
          const response = await axios.get(currentApiUrl);
          const data = response.data;
          const middayIndex = data.hourly.time.findIndex((time) =>
            time.includes("T12:00")
          );
          if (middayIndex !== -1) {
            setMiddayWeatherData((prevData) => ({
              ...prevData,
              current: {
                temperature: data.hourly.temperature_2m[middayIndex],
                windSpeed: data.hourly.wind_speed_10m[middayIndex],
              },
            }));
          }
        } catch (error) {
          console.error("Failed to fetch current midday weather data", error);
        }
      };
      fetchCurrentMiddayWeatherData();

      // Fetch historical midday weather data for each year past
      yearsAgo.forEach(async (yearAgo) => {
        const historicalYear = currentYear - yearAgo;
        const date = new Date();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // current month
        const day = String(date.getDate()).padStart(2, "0"); // current day
        const historicalApiUrl = `https://archive-api.open-meteo.com/v1/era5?latitude=${latitude}&longitude=${longitude}&start_date=${historicalYear}-${month}-${day}&end_date=${historicalYear}-${month}-${day}&hourly=temperature_2m`;

        try {
          const response = await axios.get(historicalApiUrl);
          const data = response.data;
          const middayIndex = data.hourly.time.findIndex((time) =>
            time.includes("T12:00")
          );
          if (middayIndex !== -1) {
            setMiddayWeatherData((prevData) => ({
              ...prevData,
              historical: {
                ...prevData.historical,
                [historicalYear]: {
                  temperature: data.hourly.temperature_2m[middayIndex],
                },
              },
            }));
          }
        } catch (error) {
          console.error(
            `Failed to fetch historical midday weather data for ${historicalYear}`,
            error
          );
        }
      });
    }
  }, [selectedLocation]);

  // Handler for location selection change
  const handleLocationSelectionChange = (latitude, longitude) => {
    setSelectedLocation({ latitude, longitude });
  };

  return (
    <div className="App">
      <h1>Weather in Nigeria</h1>
      <StateSelector onStateSelected={handleLocationSelectionChange} />
      <WeatherDisplay middayWeatherData={middayWeatherData} />
      <p>
        Selected Location: Latitude {selectedLocation.latitude}, Longitude{" "}
        {selectedLocation.longitude}
      </p>
    </div>
  );
}

export default App;
