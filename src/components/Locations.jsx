import React, {Component} from 'react';
import '../style/components/app.scss';
import { ReactComponent as Arrow } from '../assets/arrow-circle-right-light.svg';

class DisplayWeather extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchWord: '',
            apiKey: 'Pag00sFbYunSoXw8XR8V3QmfcOcDX38T',
            validResult: null,
            location: []
        }
    }

    render() {
        return (
            <div className="locations-weather">
                <p className="number-of-search-results text-right">{ this.props.location.length } sökresultat</p>
                <div className="wrapper">
                    { this.props.location.map((searchWord, key) => {
                        return (
                            <div className="location-container">
                                <div className="location-content" key={key} onClick={ () => this.getWeather(searchWord.Key) }>
                                    <div className="d-flex">
                                        <h4>{ searchWord.LocalizedName }</h4>
                                        <h3>-</h3>
                                        <h4>{ searchWord.AdministrativeArea.LocalizedName }</h4>
                                        <h3>-</h3>
                                        <h4>{ searchWord.Country.LocalizedName }</h4>
                                    </div>
                                    <Arrow className="arrow-right"/>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }

    getWeather(key) {
        fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=${this.state.apiKey}&details=true&metric=true`)
        .then( response => response.json() )
        .then( result => {
            this.props.callbackFromParent(result);
        })
        .catch(function(error) {
            console.log(error);
        });
    }
}

export default DisplayWeather;
