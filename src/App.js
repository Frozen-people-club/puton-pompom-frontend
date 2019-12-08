import React, { Component, useEffect } from 'react';
import logo from './logo.svg';
import './App.scss';
import CurrentWeather from './component/CurrentWeather';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      weatherData: null,
      forecast: [],
      city: 'Yaroslavl'
    };

  }
/*
componentWillMount() {
    let current = this.getWeather(this.state.city);
    let fore = this.getForecast(this.state.city);
    this.setState({
    weatherData: current,
    forecast: fore
    });
 }*/

  componentDidMount() {

    const URL = "https://puton-pompom.herokuapp.com/api/v1.0/current?q=" +
    'Yaroslavl';
    fetch(URL).then(res => res.json()).then(json => {
      this.setState({ weatherData: this.mapDataToWeatherInterface(json) });
    });
   }

   componentWillMount() {

    fetch(`https://puton-pompom.herokuapp.com/api/v1.0/current?q=Yaroslavl`)
    .then(res => res.json()).then(json => {
      this.setState({ weatherData: this.mapDataToWeatherInterface(json) });
    });
   }

  

handleResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Error: Location " + response.statusText);
  }
}


 /* getWeather(current) {
    const mappedData = this.mapDataToWeatherInterface(current);
    return mappedData;
    }
    */
  getWeather(city) {
      fetch(
        `https://puton-pompom.herokuapp.com/api/v1.0/current?q=${city}`
      )
        .then(res => this.handleResponse(res))
        .then(weather => {
      
           return this.mapDataToWeatherInterface(weather);

        }).catch(function(error) {
          console.log('Request failed', error)
      });
    }
    getForecast(city) {
      fetch(
        `https://puton-pompom.herokuapp.com/api/v1.0/forecast?q=${city}`
      )
        .then(res => this.handleResponse(res))
        .then(result => {
            let forecast = [];
            for (let i = 0; i < result.list.length; i += 8) {
              forecast.push(this.mapDataToWeatherInterface(result.list[i + 4]));
            }
            return forecast;
        }).catch(function(error) {
          console.log('Request failed', error)
      });
    }

 /* getForecast(fore) {
    let result = fore;
    const forecast = [];
    for (let i = 0; i < result.list.length; i += 8) {
        forecast.push(this.mapDataToWeatherInterface(result.list[i + 4]));
    }
    return forecast;
   }
*/
  mapDataToWeatherInterface = data => {
    const mapped = {
      city: data.name,
      country: data.sys.country,
      date: data.dt * 1000,
      humidity: data.main.humidity,
      icon_id: data.weather[0].id,
      temperature: Math.round(data.main.temp - 273.15),
      description: data.weather[0].description,
      wind_speed: Math.round(data.wind.speed * 3.6), // convert from m/s to km/h
      condition: data.cod

    };


    if (data.dt_txt) {
      mapped.dt_txt = data.dt_txt;
    }

    if (data.weather[0].icon) {
      mapped.icon = data.weather[0].icon;
    }

    if (data.main.temp_min && data.main.temp_max) {
      mapped.max = data.main.temp_max;
      mapped.min = data.main.temp_min;
    }

    return mapped;
  };




  render() {
    const weatherData = this.state.weatherData;
    if (!weatherData) return <div>Loading</div>;
   
    return (
      <div className = "App">
        <div className = {'col-xl-10 offset-xl-1 col-lg-10 offset-lg-1 App__slider'}>
        <div className = {'container-fluid'}>
        <div className={'row'}>
        <div className ={'col-xl-5 col-lg-6'}>
          <CurrentWeather city = {weatherData.city} temp = {weatherData.temperature} description = {weatherData.description}/>
        </div>
        <div className ={'col-xl-5 offset-xl-2 col-lg-6'}>
          <CurrentWeather city = {weatherData.city} temp = {weatherData.temperature} description = {weatherData.description}/>
        </div>

        </div>
        </div>
        </div>
      </div>
    )
}
}

export default App;
