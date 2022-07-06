
import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ClipLoader from "react-spinners/ClipLoader";

import WeatherBox from './components/WeatherBox';
import WeatherButton from './components/WeatherButton';

function App() {
  
  const apiKey = "efd88f078d10b3680f1707a27ec361c0";
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const cities = ['paris', 'london', 'tokyo', 'ansan'];


  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;

      getWeatherByCurrentLocation(lat, lon);
    })
  }

  // 현재 위치의 날씨
  const getWeatherByCurrentLocation = async(lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();

    setWeather(data);
    setLoading(false);
  }

  // 바튼을 클릭 했을 시, 나라별 api
  const getWeatherByCity = async() => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    setLoading(true);
    let res = await fetch(url);
    let data = await res.json();
    console.log("data? ", data);
    setWeather(data);
    setLoading(false);
  }

  useEffect(() => {
    if(city === ""){
      getCurrentLocation();
    }else {
      getWeatherByCity();
    }
  }, [city]);

  return (
    <div>
      {loading ? 
      (
        <div className='container'>
          <ClipLoader color="#f88c6b" loading={loading} size={150} />
        </div>
      )
      : 
      (
        <div className='container'>
          <ClipLoader color="#f88c6b" loading={loading} size={150} />
          <WeatherBox weather={weather}/>
          <WeatherButton cities={cities} setCity={setCity}/>
        </div>
      )
      }
    </div>
  );
}

export default App;
