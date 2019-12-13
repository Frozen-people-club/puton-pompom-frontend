import React, {Component} from 'react';

class DayWeather extends Component{
    constructor(props){
        super(props);
        this.state = {
            title: this.props.title,
            forecast: this.props.forecast,
            times: []
        }
    }

    componentDidMount() {
    }
    
      render() { 
        return ( 
        <div className="dayWeather">
            <div className='dayWeather__title'>
                {this.state.title}
            </div>
        </div>     
        )
      }
}

export default DayWeather;