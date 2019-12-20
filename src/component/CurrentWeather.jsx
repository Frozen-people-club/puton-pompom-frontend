import React, { Component } from 'react';

class CurrentWeather extends Component {
    constructor(props) {
        super(props);
        this.state = {
           /* city: this.props.city,
            temp: this.props.temp,*/
            date: '',
           /* description: this.props.description*/
        }
    }

    componentDidMount() {
        this.intervalId = setInterval(() => {
            var min = new Date().getMinutes();
            var hours = new Date().getHours();
            var cur_hours, cur_min;
            cur_hours = (hours / 10 < 1) ? ("0" + hours.toString()) : hours;
            cur_min = (min / 10 < 1) ? ("0" + min.toString()) : min;
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
                    {this.props.date}
                </div>
                <div className="background__1">
                    <div className="currentWeather__img">
                        <img className="currentWeather__img__avocado" src={require('../img/avocado.svg')} alt='avocado' />
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
                <div className='currentWeather__city'>
                    <img className='currentWeather__city__img' src={require('../img/Ellipse 2.svg')} />
                    <div className='currentWeather__city__name'>
                        {this.props.city}
                    </div>
                </div>
            </div>

        )
    }
}

export default CurrentWeather;