import React, {Component} from 'react';

class Search extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

    handleSubmit(e) {
        e.preventDefault();        
        this.props.updateCity(this.props.obj,{city: this.input.value});
      }

    render() {
        return (
            <form className="Search" onSubmit={this.handleSubmit}>
                <label>
                <input className="Search__input" type="text" placeholder="Search the city.." ref={(input) => this.input = input} />
                </label>
                <input className="Search__submit" type="submit" value="Submit" />
            </form>
        )
    }
}

export default Search;