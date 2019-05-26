import React, {Component} from 'react';
import '../style/components/app.scss';

// Components
import Header from './Header';
import Search from './Search';

class App extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="app-wrapper">
                    <div className="container">
                        <Header></Header>
                        <Search></Search>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default App;
