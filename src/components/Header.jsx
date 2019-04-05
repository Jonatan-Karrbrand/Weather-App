import React, {Component} from 'react';
import '../style/components/app.min.css';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hej: 'hej'
        }
    }

    render() {
        return (
            <React.Fragment>
                <nav>
                    <h3>Weather App</h3>
                    <ul>
                        <li><a href="#">Vädret</a></li>
                        <li><a href="#">Klimat</a></li>
                        <li><a href="#">Data</a></li>
                        <li><a href="#">Kontakt</a></li>
                    </ul>
                </nav>
            </React.Fragment>
        )
    }
}

export default Header;
