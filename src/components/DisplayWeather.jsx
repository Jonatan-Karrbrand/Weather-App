import React, {Component} from 'react';
import '../style/components/app.min.css';

class DisplayWeather extends Component {

    constructor(props) {
        super(props);
        this.state = {
            location: '',
            apiKey: 'Pag00sFbYunSoXw8XR8V3QmfcOcDX38T',
            validResult: null,
            inSweden: []
        }
    }

    render() {
        console.log(this.props.inSweden);
        return (
            <div className="display-weather">
                <div className="wrapper">

                </div>
            </div>
        )
    }
}

export default DisplayWeather;
