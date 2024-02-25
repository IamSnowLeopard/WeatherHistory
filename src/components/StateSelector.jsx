import React from "react";

// Adding states lat and long
const statesData = [
  //{ name: "Lagos", latitude: 6.52, longitude: 3.37 },
  //{ name: "Abuja", latitude: 9.05, longitude: 7.49 },
  //{ name: "Kano", latitude: 12.00, longitude: 8.59 },
  { name: "Jigawa", latitude: 12.34, longitude: 9.51 },
  // Add more states as needed
];

function StateSelector({ onStateSelected }) {
  const handleChange = (event) => {
    const selectedState = statesData.find(
      (state) => state.name === event.target.value
    );
    if (selectedState) {
      onStateSelected(selectedState.latitude, selectedState.longitude);
    }
  };

  return (
    <select onChange={handleChange} defaultValue="">
      <option value="" disabled>
        Select a state
      </option>
      {statesData.map((state, index) => (
        <option key={index} value={state.name}>
          {state.name}
        </option>
      ))}
    </select>
  );
}

export default StateSelector;
