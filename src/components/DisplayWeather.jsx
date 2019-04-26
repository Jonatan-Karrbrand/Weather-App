import React, {Component} from 'react';
import '../style/components/app.min.css';

class DisplayWeather extends Component {

    constructor(props) {
        super(props);
        this.state = {
            location: '',
            apiKey: '65bGReplBapV2Un55X8gJJmodqaofYFr',
            validResult: null,
            inSweden: []
        }
    }

    render() {
        console.log(this.props.inSweden);
        return (
            <div className="display-weather">
                <div className="wrapper">
                    this.props.inSweden.map()
                </div>
            </div>
        )
    }
}

export default DisplayWeather;
