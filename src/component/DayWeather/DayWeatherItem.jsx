import React, {Component} from 'react';

class DayWeatherItem extends Component{
    constructor(props){
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
             
            <div className="dayWeatherItem__temperature">
                {this.props.date}
                {this.props.description}
                {this.props.temp}
            </div>
        </div>
        )
    }
}

export default DayWeatherItem;