import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ClipLoader from "react-spinners/ClipLoader";

import WeatherBox from "./components/WeatherBox";
import WeatherButton from "./components/WeatherButton";
import { Container } from "react-bootstrap";

// 과제 1 :유저가 current location버튼을 누르면 다시 현재 위치 날씨를 볼 수 있다.
// 과제 2 :유저가 버튼을 클릭하면 클릭된 버튼이 표시가 된다.
// 과제 3 : try-catch를 이용한 api호출 에러 핸들링도 해보자

const apiKey = "efd88f078d10b3680f1707a27ec361c0";
const cities = ["paris", "london", "tokyo", "ansan"];

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;

      getWeatherByCurrentLocation(lat, lon);
    });
  };

  // 현재 위치의 날씨
  const getWeatherByCurrentLocation = async (lat, lon) => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
      let response = await fetch(url);
      let data = await response.json();

      setWeather(data);
      setLoading(false);
    } catch (err) {
      setApiError(err.message);
      setLoading(false);
    }
  };

  // 바튼을 클릭 했을 시, 나라별 api
  const getWeatherByCity = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      let res = await fetch(url);
      let data = await res.json();

      setWeather(data);
      setLoading(false);
    } catch (err) {
      setApiError(err.message);
      setLoading(false);
    }
  };

  const handleCityChange = (city) => {
    if (city === "current") {
      setCity("");
    } else {
      setCity(city);
    }
  };

  useEffect(() => {
    if (city === "") {
      setLoading(true);
      getCurrentLocation();
    } else {
      setLoading(true);
      getWeatherByCity();
    }
  }, [city]);

  return (
    <div>
      <Container className="vh-100">
        {loading ? (
          <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
            <ClipLoader color="#f88c6b" loading={loading} size={150} />
          </div>
        ) : !apiError ? (
          <div className="main-container">
            <WeatherBox weather={weather} />
            <WeatherButton
              cities={cities}
              handleCityChange={handleCityChange}
              selectedCity={city}
            />
          </div>
        ) : (
          apiError
        )}
      </Container>
    </div>
  );
}

export default App;
