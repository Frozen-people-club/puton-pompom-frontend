import React, {Component} from 'react';

class CurrentWeather extends Component{
    constructor(props){
        super(props);
         this.state = {
            city: this.props.city,
            temp: this.props.temp,
            date: ''
    }
}

    componentDidMount() {

        var min = new Date().getMinutes();
        var hours = new Date().getHours();
        this.setState({
            date: hours + ':' + min
        })
    }
    
      render() { 
        return ( <div>
                    {this.state.date}
                    {this.state.city}
                    {this.state.temp}
                </div>
                 
        )
      }
}

export default CurrentWeather;