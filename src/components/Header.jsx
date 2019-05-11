import React, {Component} from 'react';
import '../style/components/app.scss';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menuOpen: false
        }
    }

    render() {
        return (
            <React.Fragment>
                <nav>
                    <h3>Weather App</h3>

                    <div onClick={() => this.toggleMenuClass()} className={this.state.menuOpen ? 'open' : ' '} id="nav-icon1">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </nav>
            </React.Fragment>
        )
    }

    toggleMenuClass() {
        if ( this.state.menuOpen === false ) {
            this.setState({ menuOpen: true })
        } else {
            this.setState({ menuOpen: false })
        }
    }
}

export default Header;
