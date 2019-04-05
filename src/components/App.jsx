import React, {Component} from 'react';
import '../style/components/app.min.css';
// Components
import Header from './Header';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hej: 'hej'
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="app-wrapper">
                    <div className="container">
                        <Header></Header>
                        <h1>hello</h1>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default App;
