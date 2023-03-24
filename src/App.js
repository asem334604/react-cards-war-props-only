import React, {Component} from 'react';
import Start from "./components/Start";
import Game from "./components/Game";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {fullName: null}
    }

    setUser = (name) => {
        this.setState({...this.state, fullName: name});
        console.log(this.state);
    }

    render() {
        if (!this.state.fullName) {
            return <Start setUser={this.setUser}/>
        } else {
            return <Game/>
        }
    }
}

export default App;
