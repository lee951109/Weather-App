
import { useEffect } from 'react';
import './App.css';
import WeatherBox from './components/WeatherBox';

function App() {

  const apiKey = "efd88f078d10b3680f1707a27ec361c0";

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;

      getWeatherByCurrentLocation(lat, lon);
    })
  }

  const getWeatherByCurrentLocation = async(lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    let response = await fetch(url);
    let data = await response.json();
    console.log("data" , data);
  }


  useEffect(() => {
    getCurrentLocation();

  }, []);

  return (
    <div>
      <WeatherBox />
    </div>
  );
}

export default App;
