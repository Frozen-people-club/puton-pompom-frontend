import React, { Component, useEffect } from 'react';
import logo from './logo.svg';
import './App.scss';
import CurrentWeather from './component/CurrentWeather';
import DayWeatherList from './component/DayWeather/DayWeatherList';
import ButtonMenu from './component/ButtonMenu/ButtonMenu';
import * as Snow from 'react-snow-effect';

class App extends Component {

  constructor(props) {
    super(props);
    this.updateData = this.updateData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  iconInterface = (icon) => {
    switch(icon){
      case 'o1d':
        return 'CLEAR_DAY';
        break;
      case '01n':
        return 'CLEAR_NIGHT';
        break;
      case '03d':
        return 'PARTLY_CLOUDY_DAY';
        break;
      case '03n':
        return 'PARTLY_CLOUDY_NIGHT';
        break;
      case '04d':
        return 'CLOUDY';
        break;
      case '04n':
        return 'CLOUDY';
        break;
      case '09d':
        return 'RAIN';
        break;
      case '09n':
        return 'RAIN';
        break;
      case '10d':
        return 'RAIN';
        break;
      case '10n':
        return 'RAIN';
        break;
      case '11d':
        return 'RAIN';
        break;
      case '11n':
        return 'RAIN';
        break;
      case '13d':
        return 'SNOW';
        break;
      case '13n':
        return 'SNOW';
        break;
      case '50d':
        return 'FOG';
        break;
      case '50n':
        return 'FOG';
        break;
      default:
        return 'CLEAR_DAY';

    }
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
      condition: data.cod,
      icon_desc: this.iconInterface(data.weather[0].icon)
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

  updateData(value) {
    this.setState(value);
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
    const URLF = `https://puton-pompom.herokuapp.com/api/v1.0/forecast?q=Magnitogorsk`;
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
    const URL = `https://puton-pompom.herokuapp.com/api/v1.0/current?q=Magnitogorsk`;
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

  handleSubmit(e) {
    this.setState({
      city: this.input.value
    });
    this.getWeather();
    e.preventDefault();
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
        <form className="Search" onSubmit={this.handleSubmit}>
            <label>
              <input className="Search__input" type="text" placeholder="Search the city.." ref={(input) => this.input = input} />
            </label>
            <input className="Search__submit" type="submit" value="Submit" />
          </form>
        <div className={'col-xl-10 offset-xl-1 col-lg-10 offset-lg-1 App__slider'}>
          <div className={'container-fluid'}>
            <div className={'row'}>
              {weatherData.icon_desc === 'SNOW' ?<Snow /> : <></>}
              <div className={'col-xl-5 offset-xl-1 col-lg-6'}>
                <CurrentWeather city={weatherData.city} temp={weatherData.temperature} description={weatherData.description} icon={weatherData.icon_desc}/>
              </div>
              <div className={'col-xl-5 col-lg-6'}>
                <DayWeatherList data={forecast[this.state.active]} />
              </div>
              <div className={'col-xl-1 col-lg-1'}></div>
            </div>
          </div>
        </div>
        <ButtonMenu dayWeek = {forecast} active = {this.state.active} updateData={this.updateData}/>
      </div>
    )
  }
}

export default App;
