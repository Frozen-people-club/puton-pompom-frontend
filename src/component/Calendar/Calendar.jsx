import React, {Component} from 'react';
import Button from "../Button/Button"
var icon = require('../../img/Calendar.svg');

class Calendar extends Component {
    render() {
        var today = new Date();
        var day = today.getUTCDate();
        return (
            <div className="Calendar">
                <div className="Calendar__icon">
                    <img src={icon} alt={'Calendar'} />
                </div>
                <div className="Calendar__date">
                    {this.props.date}
                    {day}
                </div>
            </div> )
    }
}

export default Calendar;