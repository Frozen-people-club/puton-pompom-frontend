import React, { Component, useEffect } from 'react';
import logo from './logo.svg';
import './App.scss';
import CurrentWeather from './component/CurrentWeather';
import DayWeatherList from './component/DayWeather/DayWeatherList';
import ButtonMenu from './component/ButtonMenu/ButtonMenu';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      weatherData: null,
      forecast: [],
      city: 'Yaroslavl',
      active: 0
    };
  }

  componentDidMount() {
    this.getWeather();
  }

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

    let getWeekDay = (date) => {
      let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      return days[date.getDay()];
    }

    if (data.dt_txt) {
      mapped.dt_txt = data.dt_txt.slice(11, 16);
      let day = new Date(+data.dt_txt.slice(0, 4), (+data.dt_txt.slice(5, 7) - 1), +data.dt_txt.slice(8, 10))
      mapped.dayWeek = getWeekDay(day);
    }

    if (data.weather[0].icon) {
      mapped.icon = data.weather[0].icon;
    }

    if (data.main.temp_min && data.main.temp_max) {
      mapped.max = data.main.temp_max;
      mapped.min = data.main.temp_min;
    }

    return mapped;
  }

  mapDataToForecastInterface = data => {
    let forecast = [];
    for (let i = 0; i < data.list.length; i++) {
      forecast.push(this.mapDataToWeatherInterface(data.list[i]));
    }
    let current =
    [forecast.slice(0, 8), forecast.slice(8, 16), forecast.slice(16, 24), forecast.slice(24, 32), forecast.slice(32, 40)]
      /*'0': forecast.slice(0, 8),
      '1': forecast.slice(8, 16),
      '2': forecast.slice(16, 24),
      '3': forecast.slice(24, 32),
      '4': forecast.slice(32, 40)
    };*/
    return current;
  }

  getForecast(mappedData) {
    const URLF = "https://puton-pompom.herokuapp.com/api/v1.0/forecast?q=" +
      'Yaroslavl';
    fetch(URLF).then(res => res.json()).then(json =>
      this.mapDataToForecastInterface(json))
      .then(res => {
        this.setState({
          forecast: res,
          weatherData: mappedData
        })
      })
      .catch(function (error) {
        console.log('Request failed', error)
      });
  }

  getWeather() {
    const URL = "https://puton-pompom.herokuapp.com/api/v1.0/current?q=" +
      'Yaroslavl';
    fetch(URL).then(res => res.json()).then(json => this.mapDataToWeatherInterface(json))
      .then(mappedData => this.getForecast(mappedData))
      .catch(error => {
        console.error(
          `Error fetching current weather for ${this.state.city}: `,
          error
        );
        this.setState({ error: error.message });
      });
  }

  render() {
    const weatherData = this.state.weatherData;
    const forecast = this.state.forecast;
    if (!weatherData) return <div>Loading</div>;
    if (!forecast) return <div>Loading</div>;

    /*let list = this.state.forecast.map((obj, i) => {
          return <DayWeatherList  data={obj}/>})*/

    return (
      <div className="App">
        <div className={'col-xl-10 offset-xl-1 col-lg-10 offset-lg-1 App__slider'}>
          <div className={'container-fluid'}>
            <div className={'row'}>
              <div className={'col-xl-5 col-lg-6'}>
                <CurrentWeather city={weatherData.city} temp={weatherData.temperature} description={weatherData.description} />
              </div>
              <div className={'col-xl-5 offset-xl-2 col-lg-6'}>
                <DayWeatherList data={forecast[0]} />
              </div>
            </div>
          </div>
        </div>
        <ButtonMenu dayWeek = {forecast}/>
      </div>
    )
  }
}

export default App;
