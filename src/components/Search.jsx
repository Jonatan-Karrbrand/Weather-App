import React, {Component} from 'react';
import '../style/components/app.scss';
import Locations from './Locations';
import Weather from './Weather';
import { ReactComponent as SearchIcon } from '../assets/search-location-light.svg';

class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchWord: '',
            apiKey: '65bGReplBapV2Un55X8gJJmodqaofYFr',
            validResult: null,
            location: [],
            hoverLabel: false,
            swedenOnly: false,
            weather: null,
            locationKey: null,
            background: false,
            noResult: null
        }
    }

    render() {
        return (
            <div>
                <div className="component-wrapper">
                    <form onSubmit={ this.search }>

                        <div className="search-container">
                            <label htmlFor="searchBar" className={ this.state.hoverLabel && 'hover-label' }>Sök efter stad</label>
                            <input type="text" name="searchBar" autoComplete="off"
                                onChange={ event => {
                                    this.setState({ searchWord: event.target.value }, function () {
                                        this.toggleLabelClass();
                                    });
                                }}
                            />
                        <SearchIcon onClick={ this.search }/>
                        </div>

                    </form>
                </div>

                { this.state.weather ? (
                    <Weather apiKey={ this.state.apiKey } weather={ this.state.weather } locationKey={ this.state.locationKey } callbackFromParent={ this.dataFromWeatherComponent }/>
                ) : (
                    <Locations apiKey={ this.state.apiKey } noResult={ this.state.noResult } location={ this.state.location } callbackFromParent={ this.dataFromLocationsComponent }/>
                )}

            </div>
        )
    }

    // Result, location key and weather icon from Locations component
    dataFromLocationsComponent  = ( data , key, icon ) => {
        this.setState({ weather: data , locationKey: key});
        // This goes to App Component
        this.props.callbackFromApp( icon );
    }

    toggleLabelClass() {
        if ( this.state.searchWord === '' ) {
            this.setState({ hoverLabel: false })
        } else {
            this.setState({ hoverLabel: true })
        }
    }

    // Search on cities
    search = e => {
        e.preventDefault();
        this.setState({ location: [] });

        fetch(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${this.state.apiKey}&q=${this.state.searchWord}&details=true`)
        .then( response => response.json() )
        .then( result => {
            // Check for result
            if ( result.length === 0 ) {
                this.setState({ noResult: true});
            } else {
                this.setState({ weather: null , noResult: false})
                let array = [];
                result.forEach( element => {
                    // Check if only cities in sweden or not
                    if ( this.state.swedenOnly ) {
                        if ( element.Country.EnglishName === 'Sweden') {
                            array.push(element)
                            this.setState({ location: array});
                        }
                    } else {                    
                        array.push(element)
                        this.setState({ location: array});
                    }

                })
            }
        })
    }
}

export default Search;
