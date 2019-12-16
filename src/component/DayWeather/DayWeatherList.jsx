import React, {Component} from 'react';
import DayWeatherItem from './DayWeatherItem';

class DayWeatherList extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: this.props.data
        }
    }

    componentWillMount() {
    }
    
      render() {
        /*const list = [];
        list = this.props.data.map((value) => {
            return <DayWeatherItem temperature={value.temperature}/>
        }); */
        return ( 
        <div className="dayWeatherList">
        </div>
        )
      }
}

export default DayWeatherList;