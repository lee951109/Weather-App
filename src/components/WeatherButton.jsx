import React, { useState } from "react";
import { Button } from "react-bootstrap";

const WeatherButton = ({ cities, handleCityChange, selectedCity }) => {
  return (
    <div className="menu-container">
      <Button
        variant={`${selectedCity == "" ? "success" : "outline-success"}`}
        onClick={() => handleCityChange("current")}
      >
        νμ¬ μμΉ
      </Button>

      {cities.map((city, index) => (
        <Button
          variant={`${selectedCity == city ? "success" : "outline-success"}`}
          key={index}
          onClick={() => handleCityChange(city)}
        >
          {city}
        </Button>
      ))}
    </div>
  );
};

export default WeatherButton;
