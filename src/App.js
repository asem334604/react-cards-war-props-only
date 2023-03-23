import React, {Component} from 'react';
import Start from "./components/Start";
import Game from "./components/Game";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: null,
            wins: 0,
            looses: 0,
            games: 0,
        }
    }
    setUser = (name) => {
        this.setState({...this.state, fullName: name});
        console.log(this.state);
    }

    render() {
        if (!this.state.fullName) {
            return <Start setUser={this.setUser}/>
        } else {
            console.log(this.state);
            return <Game games={this.state.games}
                         wins={this.state.wins}
                         looses={this.state.looses}
            />
        }
    }
}

export default App;
