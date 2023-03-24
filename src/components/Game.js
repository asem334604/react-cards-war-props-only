import React, {Component} from 'react';
import Result from "./Result";
import newCardDeck from "../utils/NewCardDeck";
import RandomNumber from "../utils/RandomNumber";
import './style.css';

class Game extends Component {

    constructor(props) {
        super(props);
        this.state = {
            playerDeal: [],
            compDeal: [],
            isGameEnded: false,
            playerTakes: 0,
            compTakes: 0,
            games: 0,
            wins: 0,
            looses: 0
        }
    }

    componentDidMount() {
        this.dealCards();
    }

    dealCards = () => {
        let pArr = [], cArr = [], newDeck = newCardDeck();
        if (newDeck) {
            while (newDeck.length > 26) {
                let cardPos = RandomNumber(newDeck.length);
                pArr.push(newDeck[cardPos]);
                newDeck.splice(cardPos, 1);
            }
            while (newDeck.length > 0) {
                let cardPos = RandomNumber(newDeck.length);
                cArr.push(newDeck[cardPos]);
                newDeck.splice(cardPos, 1);
            }
        }
        this.setState({...this.state, playerDeal: pArr, compDeal: cArr},
            () => {
                console.log('state in function deal cards:', this.state);
                const savedState = sessionStorage.getItem('gameState');
                if (savedState) {
                    const prevState = JSON.parse(savedState);
                    this.setState({
                        games: prevState.games,
                        wins: prevState.wins,
                        looses: prevState.looses
                    }, () => {
                        console.log('update after restore', this.state)
                    })
                }
            });
    }

    nextMove = () => {
        if (this.state.compDeal.length > 0 && this.state.playerDeal.length > 0) {
            let compTakesNow = 0, playerTakesNow = 0;
            if (this.state.compDeal[0] < this.state.playerDeal[0]) {
                playerTakesNow++;
            } else {
                compTakesNow++
            }
            let compArr = [...this.state.compDeal], playerArr = [...this.state.playerDeal];
            let prevPlayerTakes = this.state.playerTakes, prevCompTakes = this.state.compTakes;
            compArr.splice(0, 1);
            playerArr.splice(0, 1);
            this.setState({
                ...this.state,
                playerTakes: prevPlayerTakes + playerTakesNow,
                compTakes: prevCompTakes + compTakesNow,
                compDeal: compArr,
                playerDeal: playerArr
            }, () => {
                console.log('state changed after move', this.state)
            })
        } else {
            let wins = this.state.wins, looses = this.state.looses, games = this.state.games
            if (this.state.playerTakes > this.state.compTakes) {
                wins++;
            } else {
                looses++;
            }
            this.setState({
                ...this.state, isGameEnded: true, wins ,looses, games: games + 1},
                () => {
                console.log('state changed after game ended', this.state);
                sessionStorage.removeItem('gameState')
                sessionStorage.setItem('gameState', JSON.stringify(this.state));
            });
        }
    }


    render() {
        if (this.state.isGameEnded) {
            return <Result
                games={this.state.games}
                wins={this.state.wins}
                looses={this.state.looses}
            />
        } else {
            return <div className={'container'}>
                <h2>COMPUTER</h2>
                <div className="card">{this.state.compDeal[0]}</div>
                <div className="card">{this.state.playerDeal[0]}</div>
                <h2>YOU</h2>
                <button className={'btn'} onClick={this.nextMove}>Next</button>
            </div>
        }
    }
}

export default Game;