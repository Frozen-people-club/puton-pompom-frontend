import React, {Component} from 'react';
import Button from "../Button/Button"
import Time from "../Time/Time";
var icon = require('../../img/Calendar.svg');

class Clothes extends Component {
    constructor(props) {
        super(props);
        this.updateData = this.updateData.bind(this);
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
      getWeather() {
        const URL = `https://puton-pompom.herokuapp.com/api/v1.0/current?q=${this.state.city}`;
        fetch(URL).then(res => res.json()).then(json => this.mapDataToWeatherInterface(json))
          .then(mappedData => this.getForecast(mappedData))
          .catch(error => {
            console.error(
              `Error fetching current weather for ${this.state.city}: `,
              error
            );
          });
      }

    render() {
        return (
            <>
            </>)
    }
}

export default Clothes;