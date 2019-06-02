import React, {Component} from 'react';
import '../style/components/app.scss';
import { ReactComponent as Arrow } from '../assets/arrow-circle-right-light.svg';

class DisplayWeather extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchWord: '',
            apiKey: this.props.apiKey,
            validResult: null,
            location: []
        }
    }

    render() {
        return (
            <div className="locations-weather">
                <p className="number-of-search-results text-right">{ this.numberOfResults() }</p>
                <div className="wrapper">
                    { this.props.location.map((searchWord, key) => {
                        return (
                            <div className="location-container slide-in-top">
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

    numberOfResults() {
        if ( this.props.noResult ) {
            return 'Inga sökresultat';
        } else if (this.props.location.length === 0) {
            return '';
        } else {
            return `${this.props.location.length} sökresultat`;
        }
    }

    getWeather(key) {
        fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=${this.state.apiKey}&details=true&metric=true`)
        .then( response => response.json() )
        .then( result => {
            console.log('locations' , result.DailyForecasts[0].Day.Icon)
            this.props.callbackFromParent(result, key, result.DailyForecasts[0].Day.Icon );
        })
        .catch(function(error) {
            console.log(error);
        });
    }
}

export default DisplayWeather;
