import React from "react";
import WeatherCard from "./WeatherCard";

function WeatherDisplay({ middayWeatherData }) {
  // Placeholder keys for demonstration
  const timeFrames = ["current", "1", "5", "10", "20"];
  return (
    <div className="weather-display">
      {timeFrames.map((timeFrame) => (
        <WeatherCard
          key={timeFrame}
          timeFrame={timeFrame}
          data={middayWeatherData[timeFrame] || {}}
        />
      ))}
    </div>
  );
}

export default WeatherDisplay;
