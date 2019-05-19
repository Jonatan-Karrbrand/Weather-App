import React, {Component} from 'react';
import '../style/components/app.scss';

class Weather extends Component {

    constructor(props) {
        super(props);
        this.state = {
            weather: this.props.weather
        }
    }

    render() {
        console.log(this.state.weather)
        return (
            <div className="weather-component">
                {  this.state.weather.DailyForecasts.map((weather, key) => {
                    let month = weather.Date.substring(5,7);
                    let day = weather.Date.substring(8,10);

                    console.log('day',  day)
                    console.log('month',  month)
                    return (
                        <div className="weather-container">
                            <h4>Today {day} {month}</h4>
                            <h5>{weather.Day.Icon}</h5>
                            <div className="temperature-container">
                                <h5>{weather.Temperature.Maximum.Value}</h5>
                                <h5>{weather.Temperature.Minimum.Value}</h5>
                            </div>
                            <h5>{weather.Day.Wind.Speed.Value} Km/h</h5>
                            <h5>{weather.Day.Rain.Value} mm</h5>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Weather;
