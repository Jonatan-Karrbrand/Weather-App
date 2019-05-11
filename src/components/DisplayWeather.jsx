import React, {Component} from 'react';
import '../style/components/app.scss';

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
        return (
            <div className="display-weather">
                <p className="number-of-search-results text-right">{ this.props.inSweden.length } sökresultat</p>
                <div className="wrapper">
                    { this.props.inSweden.map((location, key) => {
                        return (
                            <div className="location-container" key={key} onClick={ () => this.getWeather(location.Key) }>
                                <h4>{ location.LocalizedName }</h4>
                                <h4>{ location.AdministrativeArea.LocalizedName }</h4>
                                <h4>{ location.Country.LocalizedName }</h4>
                            </div>
                        )
                    }) }
                </div>
            </div>
        )
    }

    getWeather(key) {
        console.log('nyckel', key)
        fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=${this.state.apiKey}&details=true&metric=true`)
        .then( response => response.json() )
        .then( result => {
            console.log(result);
        })
        .catch(function(error) {
            console.log(error);
        });
    }
}

export default DisplayWeather;
