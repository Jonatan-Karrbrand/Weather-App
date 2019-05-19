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
            weather: null
        }
    }

    dataFromLocationsComponent  = ( data ) => {
        this.setState({ weather: data });
    }

    render() {
        return (
            <div>
                <div className="component-wrapper">
                    <form className="max-width-600 mx-auto" onSubmit={ this.search }>

                        <div className="search-container">
                            <label for="searchBar" className={ this.state.hoverLabel && 'hover-label' }>Sök efter stad</label>
                            <input type="text" name="searchBar" autocomplete="off"
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
                    <Weather weather={ this.state.weather }/>
                ) : (
                    <Locations location={ this.state.location } callbackFromParent={ this.dataFromLocationsComponent }/>
                )}

            </div>
        )
    }

    toggleLabelClass() {
        if (this.state.searchWord === '') {
            this.setState({ hoverLabel: false })
        } else {
            this.setState({ hoverLabel: true })
        }
    }

    search = e => {
        e.preventDefault();

        fetch(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${this.state.apiKey}&q=${this.state.searchWord}&details=true`)
        .then( response => response.json() )
        .then( result => {

            if ( result.length === 0 ) {
                console.log('Hitta inget');
            } else {
                this.setState({weather: null})
                let array = [];
                result.forEach( element => {
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
