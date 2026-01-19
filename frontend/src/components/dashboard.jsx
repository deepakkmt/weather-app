import React from "react";
import { useState } from "react";
import { useEffect } from "react";



function Dashboard() {
  let [city , setcity]=useState(
    {city:""})
  const [weather, setWeather] = useState({
    main: {
    temp: 0,
    humidity: 0
  },
  wind: {
    speed: 0
  }
  });


  let handlechange=(e)=>{
    const{name,value}=e.target
    
   setcity(prev => ({
  ...prev,
  [name]: value
}));


  // console.log(city)
  }
  
useEffect(() => {
  console.log(city);
}, [city]);

let getweather=async()=>{
  let fetchdata=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.city}&appid=cd8b67c85ada3900b6d2fec3fce48e90&units=metric`);
  let data=await fetchdata.json();
  setWeather(data);
  console.log(data);  
}


  return (
    <div className="main-container">
      <div className="p1-container">

        {/* Search Bar */}
        <div className="search-bar d-flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Enter a city"
            className="form-control"
            name="city"
            onChange={handlechange}
          />
          <button className="btn btn-primary" onClick={getweather}>search</button>
        </div>

        {/* Weather Image */}
        <div className="text-center mb-3">
          <img
            src="/images/weather.jpg"
            alt="weather"
            className="img-inner"
          />
        </div>

        {/* Temperature */}
        <div className="text-center temp mb-3">
          <h2 >{weather?.main?.temp}°C</h2>
        </div>

        {/* Extra Info */}
        <div className="info d-flex justify-content-between">
          <span>Humidity: {weather?.main?.humidity}%</span>
          <span>Wind:{weather?.wind?.speed} km/h</span>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
