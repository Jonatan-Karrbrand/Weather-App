import React, {Component} from 'react';
import '../style/components/app.scss';
import HourlyForecast from './HourlyForecast';
import { ReactComponent as HighTemp } from '../assets/icons/thermometer-three-quarters-light.svg';
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

class Weather extends Component {

    constructor(props) {
        super(props);
        this.state = {
            weather: this.props.weather,
            apiKey: this.props.apiKey,
            forecastDay1: [],
            forecastDay2: [],
            display: false,
            expanded: false
        }
    }

    render() {
        return (
            <div className="weather-component fade-in">
                {  this.state.weather.DailyForecasts.map((weather, key) => {
                    var currentWeatherIcon = this.weatherIcon(weather.Day.Icon);

                    var dayToDisplay = this.weatherDay(weather.Date, key);

                    let day = weather.Date.substring(8,10);
                    let month = weather.Date.substring(5,7);

                    return (
                        <div className={"weather-wrapper position-relative " + (this.state.expanded && 'expanded')}>
                            <div className="weather-container" key={key}>
                                <div className="day-icon-column">
                                    <h4><span className="dayText">{dayToDisplay}</span> <span className="dayNumbers">{day}-{month}</span></h4>
                                    {currentWeatherIcon}
                                </div>
                                <div className="temperature-column">
                                    <div className="temperature-container">
                                        <HighTemp className="icon-small"/>
                                        <h5>{weather.Temperature.Maximum.Value}°</h5>
                                        <span className="temperature-seperator">-</span>
                                        <MinTemp className="icon-small"/>
                                        <h5>{weather.Temperature.Minimum.Value}°</h5>
                                    </div>
                                </div>
                                <div className="weather-column">
                                    <div className="d-flex">
                                        <Wind className="icon-small"/>
                                        <h5>{weather.Day.Wind.Speed.Value} km/h</h5>
                                    </div>
                                </div>
                                <div className="weather-column">
                                    <div className="d-flex">
                                        <Raindrops className="icon-small"/>
                                        <h5>{weather.Day.Rain.Value} mm</h5>
                                    </div>
                                </div>
                            </div>

                            <HourlyForecast display={this.state.display} forecast={this.forecastToPass(key)}/>
                        </div>
                    )
                })}
            </div>
        )
    }

    toggleDisplay() {
        if ( this.state.display === false ) {
            this.setState({ display: true })
        } else {
            this.setState({ display: false })
        }
    }

    forecastToPass(key) {
        if ( key === 0 ) {
            return this.state.forecastDay1;
        } else if ( key === 1 ) {
            if ( this.state.forecastDay2.length === 0) {
                return null;
            } else {
                return this.state.forecastDay2;
            }

        } else {
            return null;
        }
    }

    componentWillMount() {
        var key = this.props.locationKey;

        fetch(`http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${key}?apikey=${this.state.apiKey}&details=true&metric=true`)
        .then( response => response.json() )
        .then( result => {
            this.weatherIcon(result[0].WeatherIcon)
            var forecastDay1 = [];
            var forecastDay2 = [];

            var todaysDate = new Date();
            todaysDate = todaysDate.getUTCDate();

            result.forEach(function(element) {

                let day = element.DateTime.substring(8,10);

                if (todaysDate == day) {
                    forecastDay1.push(element)
                } else {
                    forecastDay2.push(element)
                }
            })
            this.setState({forecastDay1, forecastDay2})

        })
    }

    weatherDay(date, key) {
        var dayToDisplay;
        var currentWeatherDate = new Date(date);
        var weekday = new Array(7);
        weekday[0] = "Söndag";
        weekday[1] = "Måndag";
        weekday[2] = "Tisdag";
        weekday[3] = "Onsdag";
        weekday[4] = "Torsdag";
        weekday[5] = "Fredag";
        weekday[6] = "Lördag";

        if (key === 0) {
            dayToDisplay = 'Idag';
        } else if (key === 1) {
            dayToDisplay = 'Imorgon';
        } else {
            dayToDisplay = weekday[currentWeatherDate.getDay()];
        }

        return dayToDisplay;
    }

    weatherIcon(w) {
        var currentWeatherIcon;

        if (w === 1 || w === 2 || w === 3) {
            currentWeatherIcon = <WeatherSun className="icon-big" weather="sun"/>;
        } else if (w === 4 || w === 6) {
            currentWeatherIcon = <WeatherCloudSun className="icon-big" weather="cloud-sun"/>;
        } else if (w === 5) {
            currentWeatherIcon = <WeatherSunHaze className="icon-big" weather="sunhaze"/>;
        } else if (w === 7 || w === 8) {
            currentWeatherIcon = <WeatherCloud className="icon-big" weather="cloud"/>;
        } else if (w === 11) {
            currentWeatherIcon = <WeatherFog className="icon-big" weather="fog"/>;
        } else if (w === 12) {
            currentWeatherIcon = <WeatherCloudLightRain className="icon-big" weather="rain"/>;
        } else if (w === 13 || w === 14) {
            currentWeatherIcon = <WeatherCloudSunRain className="icon-big" weather="sun-rain"/>;
        } else if (w === 15) {
            currentWeatherIcon = <WeatherCloudThunder className="icon-big" weather="thunder"/>;
        } else if (w === 16 || w === 17) {
            currentWeatherIcon = <WeatherSunCloudThunder className="icon-big" weather="thunder"/>;
        }  else if (w === 18) {
            currentWeatherIcon = <WeatherCloudHeavyRain className="icon-big" weather="rain"/>;
        } else if (w === 19 || w === 20 || w === 21 || w === 23) {
            currentWeatherIcon = <WeatherSnowClear className="icon-big" weather="snow-clear"/>;
        } else if (w === 22 || w === 24) {
            currentWeatherIcon = <WeatherSnow className="icon-big" weather="snow"/>;
        } else if (w === 25 || w === 26 || w === 29) {
            currentWeatherIcon = <WeatherRainSnow className="icon-big" weather="rain-snow"/>;
        } else if (w === 32) {
            currentWeatherIcon = <WeatherWind className="icon-big" weather="wind"/>;
        } else {
            currentWeatherIcon = <WeatherTornado className="icon-big" weather="tornado"/>;
        }

        return currentWeatherIcon;
    }
}

export default Weather;
