import React, {Component} from 'react';
import Game from "./Game";
import './style.css';

class Result extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newGame: false
        }
    }
    componentDidMount() {
        this.setState({newGame: false})
    }

    startNewGame =() => {
        this.setState({newGame: true})
    }

    render() {
        if(this.state.newGame){
            return <Game/>
        }
        return (
            <div className={'container'}>
                <h3>Games: {this.props.games}</h3>
                <h3>LOSE/WIN</h3>
                <h3>{this.props.looses} - {this.props.wins}</h3>
                <button onClick={this.startNewGame} className={'btn'}>Again?</button>
            </div>
        );
    }
}

export default Result;