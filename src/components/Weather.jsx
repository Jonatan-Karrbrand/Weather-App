import React, {Component} from 'react';
import '../style/components/app.scss';
import { ReactComponent as WeatherCloudyLightRain } from '../assets/icons/cloud-drizzle-light.svg';
import { ReactComponent as HighTemp } from '../assets/icons/thermometer-three-quarters-light.svg';
import { ReactComponent as MinTemp } from '../assets/icons/thermometer-one-quarters-light.svg';
import { ReactComponent as Wind } from '../assets/icons/wind-light.svg';
import { ReactComponent as Raindrops } from '../assets/icons/raindrops-light.svg';

class Weather extends Component {

    constructor(props) {
        super(props);
        this.state = {
            weather: this.props.weather,
            counter: 0,
            days: []
        }
    }

    render() {
        console.log(this.state.weather)
        return (
            <div className="weather-component">
                {  this.state.weather.DailyForecasts.map((weather, key) => {
                    let day = weather.Date.substring(8,10);
                    let month = weather.Date.substring(5,7);

                    return (
                        <div className="weather-container">
                            <h4>Today {day} {month}</h4>
                            <WeatherCloudyLightRain className="icon-big"/>
                            <div className="temperature-container">
                                <HighTemp className="icon-small"/>
                                <h5>{weather.Temperature.Maximum.Value}</h5>
                                <span className="temperature-seperator">-</span>
                                <MinTemp className="icon-small"/>
                                <h5>{weather.Temperature.Minimum.Value}</h5>
                            </div>
                            <div className="d-flex">
                                <Wind className="icon-small"/>
                                <h5>{weather.Day.Wind.Speed.Value} km/h</h5>
                            </div>
                            <div className="d-flex">
                                <Raindrops className="icon-small"/>
                                <h5>{weather.Day.Rain.Value} mm</h5>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }

    componentWillMount() {
        var someDate = new Date();
        var weekday = new Array(7);
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";

        var n = weekday[someDate.getDay() + this.state.counter];
        if (this.state.counter < 7 ) {
            this.setState({ counter: this.state.counter + 1 })
        }

        this.setState({ days: this.state.days + n })
        console.log(n)
    }
}

export default Weather;
