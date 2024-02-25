import React from "react";

function WeatherCard({ timeFrame, data }) {
  return (
    <div className="weather-card">
      <h3>
        {timeFrame === "current"
          ? "Current Midday"
          : `${timeFrame} Years Ago Midday`}
      </h3>
      <p>Temperature: {data.temperature}°C</p>
    </div>
  );
}

export default WeatherCard;
