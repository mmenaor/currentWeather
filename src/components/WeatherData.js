import React, { useEffect, useState } from 'react';
import axios from "axios";

const WeatherData = () => {

    const [ weatherData, setWeatherData ] = useState({});
    const [ isCelsius, setIsCelsius ] = useState(true);

    const success = (pos) => {
        const lon = pos.coords.longitude;
        const lat = pos.coords.latitude;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=d16a2285c05c1bb21f4fab73b242b4f8`;

        axios.get(url)
        .then (res => res.data)
        .then (data => {
                console.log(data);
                setWeatherData({
                    city: data.name,
                    country: data.sys.country,
                    icon: data.weather[0].icon,
                    temperature: Math.round(data.main.temp - 273.15),
                    maxTemp: Math.round(data.main.temp_max - 273.15),
                    minTemp: Math.round(data.main.temp_min - 273.15),
                    pressure: data.main.pressure,
                    humidity: data.main.humidity,
                    description: data.weather[0].main,
                    clouds: data.clouds.all,
                    wind: data.wind.speed
                });
            })
    }

    const error = () => {
        console.log("ERROR: el usuario no da permiso de usar su ubicación.");
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success, error)
    }, []);

    return (
        <div className="mainContainer">
            <h1>Weather App</h1>
            <h2>{weatherData.city}, {weatherData.country}</h2>
            <div className="dataContainer">
                <div className="imageContainer">
                    <h3>{isCelsius ? `${weatherData.temperature} °C` : `${weatherData.temperature * 9 / 5 + 32} °F`}</h3>
                    <img src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`} alt={`${weatherData.icon} icon`} />
                    <p>{weatherData.description}</p>
                </div>
                <ul className="listContainer">
                    <li>
                        <i className="fa-solid fa-wind"></i>
                        <p><b>Wind speed:</b> {weatherData.wind}m/s</p>
                    </li>
                    <li>
                        <i className="fa-solid fa-cloud"></i>
                        <p><b>Clouds:</b> {weatherData.clouds}% </p>
                    </li>
                    <li>
                        <i className="fa-solid fa-temperature-three-quarters"></i>
                        <p><b>Pressure:</b> {weatherData.pressure}hPa</p>
                    </li>
                </ul>
            </div>
            <button className="button-48" onClick={() => setIsCelsius(!isCelsius)}><span className="text">Change °C / °F</span></button>
        </div>
    );
};

export default WeatherData;