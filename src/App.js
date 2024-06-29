import React, { useState } from "react";
import axios from "axios";
import video from "./assets/video.mp4";
import sunnyVideo from "./assets/sunny.mp4";
import hazeVideo from "./assets/haze.mp4";
import cloudyVideo from "./assets/cloudy.mp4";
import rainyVideo from "./assets/rainy.mp4";
import snowVideo from "./assets/snow.mp4";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [videoSource, setVideoSource] = useState(video);

  const apiKey = "f66556f693d2a555512b76af4ed62cce";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${apiKey}`;

  const convertFahrenheitToCelsius = (fahrenheit) => {
    return ((fahrenheit - 32) * 5) / 9;
  };

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios
        .get(url)
        .then((response) => {
          setData(response.data);
          setErrorMessage("");
          setVideoSource(getVideoForWeather(response.data.weather[0].main));
        })
        .catch((error) => {
          setErrorMessage("Please enter a correct location");
        });
      setLocation("");
    }
  };

  const getVideoForWeather = (weatherCondition) => {
    switch (weatherCondition) {
      case "Clear":
        return sunnyVideo;
      case "Clouds":
        return cloudyVideo;
      case "Rain":
        return rainyVideo;
      case "Haze":
        return hazeVideo;
        case "Snow":
        return snowVideo;
      default:
        return video; // Default to sunny video
    }
  };



  return (
    <>
     <video className="background-video" src={videoSource} autoPlay loop muted />
      <div className="App">
        <div className="search">
          <input
            value={location}
            onKeyPress={searchLocation}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="Enter Location"
            type="text"
          />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
        <div className="container">
          <div className="top">
            <div className="location">
              <p>{data.name}</p>
            </div>
            <div className="temp">
              {data.main ? (
                <>
                  <h1>{data.main.temp.toFixed()}°F</h1>
                  <p>
                    {convertFahrenheitToCelsius(data.main.temp).toFixed()}°C
                  </p>
                </>
              ) : null}
            </div>
            <div className="desc">
              {data.weather ? <p>{data.weather[0].main}</p> : null}
            </div>
          </div>

          {data.name !== undefined && (
            <div className="bottom">
              <div className="feels">
                {data.main ? (
                  <p className="bold">{data.main.feels_like}</p>
                ) : null}
                <p>Feels like</p>
              </div>
              <div className="humidity">
                {data.main ? (
                  <p className="bold">{data.main.humidity.toFixed()}%</p>
                ) : null}
                <p>Humidity</p>
              </div>
              <div className="wind">
                {data.wind ? (
                  <p className="bold">{data.wind.speed.toFixed()} km/h</p>
                ) : null}
                <p>Wind speed</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
