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
       /* let list = this.props.data[0].map((value) => {
              return <DayWeatherItem temp={value.temperature}/>
          });*/
       let list = [];
       for (let i=0; i< 8; i++)
           list.push( <DayWeatherItem temp = {this.props.data[i].temperature} date = {this.props.data[i].dt_txt} description={this.props.data[i].description}/>);
        return ( 
        <div className="dayWeatherList">
            {list}

        </div>
        )
      }
}

export default DayWeatherList;