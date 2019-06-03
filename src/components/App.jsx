import React, {Component} from 'react';
import '../style/components/app.scss';

// Components
import Header from './Header';
import Search from './Search';

// Background images
import cloud from '../assets/images/cloud2.jpg';
import fog from '../assets/images/fog3.jpg';
import rainLight from '../assets/images/rain.jpg';
import rainHeavy from '../assets/images/rain2.jpg';
import rainSnow from '../assets/images/rain-snow4.jpg';
import snow from '../assets/images/snow2.jpg';
import snowClear from '../assets/images/snow-clear2.jpg';
import sun from '../assets/images/sun4.jpg';
import sunCloud from '../assets/images/sun-cloud.jpg';
import sunhaze from '../assets/images/sunhaze2.jpg';
import sunRain from '../assets/images/sun-rain.jpg';
import thunder from '../assets/images/thunder2.jpg';
import tornado from '../assets/images/tornado.jpg';
import wind from '../assets/images/wind.jpg';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            background: false
        }
    }

    render() {
        // Background render check
        if (this.state.background) {
            var background = {
                background: `linear-gradient(to right bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2)), url(${ this.state.background })`,
                backgroundColor: 'black',
            };
        } else {
            background = {
                background: `linear-gradient(to bottom, #101033, rgb(13, 0, 21))`,
                backgroundColor: 'black',
            };
        }

        return (
            <React.Fragment>
                <div className="app-wrapper" style={ background }>
                    <div className="app-overlay"></div>
                    <div className="container">
                        <Header></Header>
                        <Search callbackFromApp={ this.dataFromSearchComponent }></Search>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    // Background images, from search component
    dataFromSearchComponent = ( w ) => {
        var currentWeatherIcon;

        if (w === 1 || w === 2 || w === 3) {
            currentWeatherIcon = sun;
        } else if (w === 4 || w === 6) {
            currentWeatherIcon = sunCloud;
        } else if (w === 5) {
            currentWeatherIcon = sunhaze;
        } else if (w === 7 || w === 8) {
            currentWeatherIcon = cloud;
        } else if (w === 11) {
            currentWeatherIcon = fog;
        } else if (w === 12) {
            currentWeatherIcon = rainLight;
        } else if (w === 13 || w === 14) {
            currentWeatherIcon = sunRain;
        } else if (w === 15) {
            currentWeatherIcon = thunder;
        } else if (w === 16 || w === 17) {
            currentWeatherIcon = thunder;
        }  else if (w === 18) {
            currentWeatherIcon = rainHeavy;
        } else if (w === 19 || w === 20 || w === 21 || w === 23) {
            currentWeatherIcon = snowClear;
        } else if (w === 22 || w === 24) {
            currentWeatherIcon = snow;
        } else if (w === 25 || w === 26 || w === 29) {
            currentWeatherIcon = rainSnow;
        } else if (w === 32) {
            currentWeatherIcon = wind;
        } else {
            currentWeatherIcon = tornado;
        }

        this.setState({ background: currentWeatherIcon })
    }

}

export default App;
