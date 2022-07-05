import React, { useState } from 'react'
import { Button } from 'react-bootstrap'


const WeatherButton = ({ cities,  setCity}) => {


  return (
    <div>
      <Button variant='warning'>현재 위치</Button>
      
      {cities.map((item, index) => (
        <Button variant='warning' key={index} onClick={() => setCity(item)}>{ item }</Button>
      ))}
    </div>
  )
}

export default WeatherButton;
