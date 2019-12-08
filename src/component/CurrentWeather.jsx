import React, {Component} from 'react';

class CurrentWeather extends Component{
    constructor(props){
        super(props);
         this.state = {
            city: this.props.city,
            temp: this.props.temp,
            date: '',
            description: this.props.description
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
        return ( <div class="currentWeather">
            <div className='currentWeather__date'>{this.state.date}</div>
                <div class="background__1">
                        <div class="currentWeather__img">
                            <img class="currentWeather__img__avocado" src= {require('../img/avocado.svg')} alt='avocado' />
                        </div>   
                </div>
                <div className='currentWeather__weather'>
                    <div className='currentWeather__temp'>{this.state.temp}°</div>
                    <div className='currentWeather__description'>{this.state.description}</div>
                </div>
                <div className='currentWeather__city'>
                    <img className='currentWeather__city__img' src={require('../img/Ellipse 2.svg')}/>
                    <div className='currentWeather__city__name'>{this.state.city}</div>    
                </div> 
            </div>
                 
        )
      }
}

export default CurrentWeather;