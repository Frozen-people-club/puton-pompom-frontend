import React, { Component } from 'react';

class DayWeatherItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            temp: this.props.temp,
            description: this.props.description,
            date: this.props.date
        }
    }
    render() {
        return (
            <div className="dayWeatherItem">
                <div className="dayWeatherItem__date">
                    {this.props.date}
                </div>
                <div className="dayWeatherItem__icon">
                    {this.props.description}
                </div>
                <div className="dayWeatherItem__temp">
                    {this.props.temp}°
                </div>
            </div>
        )
    }
}

export default DayWeatherItem;