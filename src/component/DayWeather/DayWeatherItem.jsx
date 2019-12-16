import React, {Component} from 'react';

class DayWeatherItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            city: this.props.city,
            temp: this.props.temp, 
            hours: this.props.hours,
            data: ['00:00', '03:00','06:00','09:00','12:00',
            '15:00', '18:00', '21:00']
        }
    }

    
    render() {
        return ( 
        <div className="dayWeatherItem">
            
        </div>
        )
    }
}

export default DayWeatherItem;