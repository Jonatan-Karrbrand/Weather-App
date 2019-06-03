import React, {Component} from 'react';
import '../style/components/app.scss';
// Icons
import { ReactComponent as MinTemp } from '../assets/icons/thermometer-one-quarters-light.svg';
import { ReactComponent as Wind } from '../assets/icons/wind-light.svg';
import { ReactComponent as Raindrops } from '../assets/icons/raindrops-light.svg';
import { ReactComponent as WeatherCloudLightRain } from '../assets/icons/cloud-drizzle-light.svg';
import { ReactComponent as WeatherCloudHeavyRain } from '../assets/icons/cloud-showers-light.svg';
import { ReactComponent as WeatherCloud } from '../assets/icons/clouds-light.svg';
import { ReactComponent as WeatherFog } from '../assets/icons/fog-light.svg';
import { ReactComponent as WeatherSunHaze } from '../assets/icons/sun-haze-light.svg';
import { ReactComponent as WeatherCloudSun } from '../assets/icons/cloud-sun-light.svg';
import { ReactComponent as WeatherCloudSunRain } from '../assets/icons/cloud-sun-rain-light.svg';
import { ReactComponent as WeatherSun } from '../assets/icons/sun-light.svg';
import { ReactComponent as WeatherTornado } from '../assets/icons/tornado-light.svg';
import { ReactComponent as WeatherWind } from '../assets/icons/windsock-light.svg';
import { ReactComponent as WeatherSunCloudThunder } from '../assets/icons/thunderstorm-sun-light.svg';
import { ReactComponent as WeatherCloudThunder } from '../assets/icons/thunderstorm-light.svg';
import { ReactComponent as WeatherSnowClear } from '../assets/icons/snowflake-light.svg';
import { ReactComponent as WeatherSnow } from '../assets/icons/cloud-snow-light.svg';
import { ReactComponent as WeatherRainSnow } from '../assets/icons/cloud-sleet-light.svg';

class HourlyForecast extends Component {

    constructor(props) {
        super(props);
        this.state = {
            display: false
        }
    }

    render() {
        return (
            <React.Fragment >
                { this.props.forecast != null
                    ? (
                    <div>
                        <div className="overlay" onClick={() => this.toggleDisplay()}></div>
                        <div className={"hourly-forecast-component " + ( !this.state.display && 'display-weather' )}>
                            { this.props.forecast.map((forecast, key) => {
                                var currentWeatherIcon = this.weatherIcon(forecast.WeatherIcon);

                                let hour = forecast.DateTime.substring(11,16);
                                return (
                                    <div className="forecast-container" key={key}>
                                        <div className="hour-icon-column">
                                            <h5>{hour}</h5>
                                            {currentWeatherIcon}
                                        </div>
                                        <div className="forecast-column">
                                            <div className="temperature-container">
                                                <MinTemp className="icon-small"/>
                                                <h6>{forecast.Temperature.Value}°</h6>
                                            </div>
                                        </div>
                                        <div className="wind-column">
                                            <div className="d-flex">
                                                <Wind className="icon-small"/>
                                                <h6>{forecast.Wind.Speed.Value} km/h</h6>
                                            </div>
                                        </div>
                                        <div className="forecast-column">
                                            <div className="d-flex">
                                                <Raindrops className="icon-small"/>
                                                <h6>{forecast.Rain.Value} mm</h6>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }) }
                        </div>
                    </div> )
                    : null
                }
            </React.Fragment>
        )
    }

    toggleDisplay() {
        if ( this.state.display === false ) {
            this.setState({ display: true })
        } else {
            this.setState({ display: false })
        }
    }

    // Weather icons
    weatherIcon(w) {
        var currentWeatherIcon;

        if (w === 1 || w === 2 || w === 3) {
            currentWeatherIcon = <WeatherSun className="icon-big"/>;
        } else if (w === 4 || w === 6) {
            currentWeatherIcon = <WeatherCloudSun className="icon-big"/>;
        } else if (w === 5) {
            currentWeatherIcon = <WeatherSunHaze className="icon-big"/>;
        } else if (w === 7 || w === 8) {
            currentWeatherIcon = <WeatherCloud className="icon-big"/>;
        } else if (w === 11) {
            currentWeatherIcon = <WeatherFog className="icon-big"/>;
        } else if (w === 12) {
            currentWeatherIcon = <WeatherCloudLightRain className="icon-big"/>;
        } else if (w === 13 || w === 14) {
            currentWeatherIcon = <WeatherCloudSunRain className="icon-big"/>;
        } else if (w === 15) {
            currentWeatherIcon = <WeatherCloudThunder className="icon-big"/>;
        } else if (w === 16 || w === 17) {
            currentWeatherIcon = <WeatherSunCloudThunder className="icon-big"/>;
        }  else if (w === 18) {
            currentWeatherIcon = <WeatherCloudHeavyRain className="icon-big"/>;
        } else if (w === 19 || w === 20 || w === 21 || w === 23) {
            currentWeatherIcon = <WeatherSnowClear className="icon-big"/>;
        } else if (w === 22 || w === 24) {
            currentWeatherIcon = <WeatherSnow className="icon-big"/>;
        } else if (w === 25 || w === 26 || w === 29) {
            currentWeatherIcon = <WeatherRainSnow className="icon-big"/>;
        } else if (w === 32) {
            currentWeatherIcon = <WeatherWind className="icon-big"/>;
        } else {
            currentWeatherIcon = <WeatherTornado className="icon-big"/>;
        }

        return currentWeatherIcon;
    }
}

export default HourlyForecast;
