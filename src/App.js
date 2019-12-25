import React, { Component, useEffect } from 'react';
import logo from './logo.svg';
import './App.scss';
import CurrentWeather from './component/CurrentWeather';
import DayWeatherList from './component/DayWeather/DayWeatherList';
import ButtonMenu from './component/ButtonMenu/ButtonMenu';
import * as Snow from 'react-snow-effect';
import Calendar from './component/Calendar/Calendar';
import Search from './component/Search/Search';

class App extends Component {

  constructor(props) {
    super(props);
    this.updateData = this.updateData.bind(this);
    this.getTime = this.getTime.bind(this);
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
  componentDidUpdate(prevProps, prevState) {
    if (this.state.city !== prevState.city) {
      this.getWeather();
    }
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
      wind_speed: Math.round(data.wind.speed * 3.6),
      condition: data.cod,
      icon_desc: this.iconInterface(data.weather[0].icon),
      timezone: data.timezone,
      clothes: data.clothes["icon_id"],
      date_txt: "00:00"
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

  getTime = (date, timezone) =>{
    let dayHour = +date.slice(0, 2);
    dayHour= dayHour + timezone/3600;
    if (dayHour < 0){
        dayHour = 24 + dayHour;
    }
    else if (dayHour >=24) {
        dayHour = dayHour - 24;
    }
    let cur_hours = (dayHour / 10 < 1) ? ("0" + dayHour.toString()) :dayHour;
    return cur_hours+':00';
}

  mapDataToForecastInterface = data => {
    let forecast = []
    for (let i = 0; i < data.list.length; i++) {
      forecast.push(this.mapDataToWeatherInterface(data.list[i]));
    };


    let timezone = data.city.timezone * 1000
    let server_timezone = new Date().getTimezoneOffset() * 60000 * -1
    forecast.forEach((item)=>{
      item.date = item.date + timezone
      let date = new Date(item.date - server_timezone)
      let cur_hours = (date.getHours() / 10 < 1) ? ("0" + date.getHours().toString()) : date.getHours();
      let cur_min = (date.getMinutes()/ 10 < 1) ? ("0" + date.getMinutes().toString()) : date.getMinutes();
      item.date_txt =  cur_hours+ ":" + cur_min;
    })
    let new_forecast = []
    let first_dt = forecast[0].date
    let first_date = new Date(first_dt)
    first_date = new Date(first_date.getFullYear(), first_date.getMonth(), first_date.getDate(), 0, 0, 0, 0)
    forecast.forEach((item) => {
      let item_date = new Date(item.date - server_timezone)
      var timeDiff = Math.abs(first_date.getTime() - item_date.getTime())
      var diffDays = Math.ceil(timeDiff / (1000*3600*24)) - 1

      if(diffDays < 0){
        diffDays = 0
      }
      
      if(diffDays  >= new_forecast.length){
        new_forecast.push([item])
      }
      else{
        new_forecast[diffDays].push(item)
      }
    })
    return new_forecast;
  }

  getForecast(mappedData) {
    const URLF = `https://puton-pompom.herokuapp.com/api/v1.0/forecast?q=${this.state.city}`;
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
    const URL = `https://puton-pompom.herokuapp.com/api/v1.0/current?q=${this.state.city}`;
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
    return (
      
      <div className="App">
          <div className={'container-fluid'}>
            <div className={'row align-items-center'} >
              <div className={'col-md-7 offset-md-2'}>
                <Search updateData={this.updateData} city={this.state.city}/>
              </div>
              <div className={'col-md-3'}>
                <Calendar timezone = {weatherData.timezone}/>
              </div>
            </div>
        </div>
        
        <div className={'col-xl-10 offset-xl-1 col-lg-10 offset-lg-1 col-md-12 App__slider'}>
          <div className={'container-fluid'}>
            <div className={'row align-items-center'}>
              {weatherData.icon_desc === 'SNOW' ?<Snow /> : <></>}
              <div className={'col-xl-5 offset-xl-1 col-lg-6 col-md-6'}>
                <CurrentWeather city={weatherData.city} temp={weatherData.temperature} description={weatherData.description} icon={weatherData.icon_desc} timezone = {weatherData.timezone} clothes={weatherData.clothes}/>
              </div>
              <div className={'col-xl-5 col-lg-6 col-md-6'}>
                <DayWeatherList data={forecast[this.state.active]}/>
              </div>
              <div className={'col-xl-1 col-lg-0 col-md-0'}></div>
            </div>
          </div>
        </div>
        <ButtonMenu dayWeek = {forecast} active = {this.state.active} updateData={this.updateData}/>
      </div>
    )
  }
}

export default App;
