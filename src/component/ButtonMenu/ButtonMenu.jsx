import React, {Component} from 'react';
import Button from "../Button/Button"

class ButtonMenu extends Component {
    render() {
        let list = this.props.dayWeek.map((val, index) => {
            return <Button key={index} dayWeek={val[0].dayWeek}/>
        });
        return (
            <div> {list}</div>)
    }
}

export default ButtonMenu;