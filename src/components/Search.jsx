import React, {Component} from 'react';
import '../style/components/app.scss';
import DisplayWeather from './DisplayWeather';
import { ReactComponent as SearchIcon } from '../assets/search-location-light.svg';

class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            location: '',
            apiKey: '65bGReplBapV2Un55X8gJJmodqaofYFr',
            validResult: null,
            inSweden: [],
            hoverLabel: false
        }
    }

    render() {
        return (
            <div className="search-weather">
                <form className="max-width-600 mx-auto" onSubmit={ this.search }>

                    <div className="search-container">
                        <label for="searchBar" className={this.state.hoverLabel ? 'hover-label' : ' '}>Sök efter stad</label>
                        <input type="text" name="searchBar"
                            onChange={ event => {
                                this.setState({ location: event.target.value }, function () {
                                    this.toggleLabelClass();
                                });
                            }}
                        />
                    <SearchIcon onClick={ this.search }/>
                    </div>

                </form>
                <DisplayWeather inSweden={this.state.inSweden}/>
            </div>
        )
    }

    toggleLabelClass() {
        if (this.state.location === '') {
            this.setState({ hoverLabel: false })
        } else {
            this.setState({ hoverLabel: true })
        }
    }

    search = e => {
        e.preventDefault();

        fetch(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${this.state.apiKey}&q=${this.state.location}&details=true`)
        .then( response => response.json() )
        .then( result => {
            // console.log(result)

            if ( result.length === 0 ) {
                console.log('Hitta inget');
            } else if (result.lenght === 1) {
                console.log('Hitta 1, bra');
            } else {
                let array = [];
                result.forEach( element => {
                    if ( element.Country.EnglishName === 'Sweden') {
                        array.push(element)
                        this.setState({ inSweden: array});
                    }
                    else {
                        console.log('mhe')
                    }
                })
            }
        })
    }
}

export default Search;
