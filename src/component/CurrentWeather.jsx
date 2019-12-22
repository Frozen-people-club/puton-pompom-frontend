import React, {Component} from 'react';
import ReactAnimatedWeather from 'react-animated-weather';

class CurrentWeather extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: '',
        }
    }

    componentDidMount() {
        this.intervalId = setInterval(() => {
            let date = new Date().getHours() * 60;
            let min = new Date().getMinutes();
            let time_zone = new Date().getTimezoneOffset();
            let currentTime = date + min + time_zone;
            let currentHour = Math.floor(currentTime / 60);
            let currentMin = currentTime % 60;
            let timezone = this.props.timezone / 3600;
            currentHour = currentHour + timezone;
            let cur_hours = (currentHour / 10 < 1) ? ("0" + currentHour.toString()) : currentHour;
            let cur_min = (currentMin / 10 < 1) ? ("0" + currentMin.toString()) : currentMin;
            this.setState({
                date: cur_hours + ':' + cur_min
            })
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }


    render() {
        return (
            <div className="currentWeather">
                <div className='currentWeather__date'>
                    {this.state.date}
                </div>
                <div className="background__1">
                    <div className="currentWeather__img">
                        <img className="currentWeather__img__avocado" src={require('../img/avocado.svg')}
                             alt='avocado'/>
                    </div>
                </div>
                <div className='currentWeather__weather'>
                    <div className='currentWeather__temp'>
                        {this.props.temp}°
                    </div>
                    <div className='currentWeather__description'>
                        {this.props.description}
                    </div>
                </div>
                <div className='currentWeather__icon-weather'>
                    <ReactAnimatedWeather
                        icon={this.props.icon}
                        color={'#F9E7F1'}
                        size={60}
                        animate={true}
                    />
                </div>
                <div className='currentWeather__city'>
                    <img className='currentWeather__city__img' src={require('../img/Ellipse 2.svg')}/>
                    <div className='currentWeather__city__name'>
                        {this.props.city}
                    </div>
                </div>
            </div>

        )
    }
}

export default CurrentWeather;