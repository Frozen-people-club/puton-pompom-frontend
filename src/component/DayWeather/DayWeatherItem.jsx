import React, {Component} from 'react';

class DayWeatherItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            temperature: this.props.temperature, 
            description: this.props.description,
            date: this.props.date
        }
    }

    
    render() {
        return ( 
        <div className="dayWeatherItem">
             
            <div className="dayWeatherItem__temperature">
                {this.state.temperature}
            </div>
        </div>
        )
    }
}

export default DayWeatherItem;