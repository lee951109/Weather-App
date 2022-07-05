import React from 'react'


const WeatherBox = ({weather}) => { //props 생략


  // 화씨 구하는 방법 ( 섭씨 * 180 / 100 ) + 32
  let fahrenheit = (weather?.main.temp * 180 / 100) + 32 

  return (
    <div className='weatherBox'>
       <div>{ weather?.name }</div>{/* weather?.name ==> 삼항연산자.  */}
      <h2>{ weather?.main.temp }℃ / {Math.round(fahrenheit * 100) / 100}℉</h2>
      <h3>{ weather?.weather[0].main}</h3>
      
    </div>
  )
};

export default WeatherBox;
