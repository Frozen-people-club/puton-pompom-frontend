import React, { Component } from 'react';
import DayWeatherItem from './DayWeatherItem';

class DayWeatherList extends Component {
    constructor(props) {
        super(props);
            this.state = {
            data: this.props.data
        }
    }
    render() {


        let list = [];
        for (let i = 0; i < this.props.data.length; i++)
            list.push(<DayWeatherItem temp={this.props.data[i].temperature} date={this.props.data[i].date_txt} icon={this.props.data[i].icon}/>);
        return (
            <div className="dayWeatherList">
                <div className ="dayWeatherList__title">Daily forecast</div>
                <div className="dayWeatherList__items">{list}</div>
            </div>
        )
    }
}

export default DayWeatherList;