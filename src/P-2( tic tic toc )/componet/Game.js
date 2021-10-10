import React, { Component } from 'react'
import Board from './Board'

export default class Game extends Component {
    constructor(props) {
        super(props)
        this.state = {
            xIsNext: true,
            stepNumber: 0,
            history: [
                { squares: Array(9).fill(null) }
            ],
            
        }
        // this.flage = 0;
    }
    handleClick = (i) => {
        // if (this.flage === 1) {
        //     return;
        // }
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        // console.log("inside handleClick history", history)
        const current = history[history.length - 1];
        // console.log("inside handleClick current", current)
        const squares = current.squares.slice();
        // console.log("inside handleClick squares", squares)
        const winner = calculateWinner(squares);
        
        
        console.log(winner);
        console.log(winner && squares[i]);
        
        if (winner || squares[i]) {
            // this.flage = 1;
            return;
        }
        
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        
        this.setState({
            history: history.concat({
                squares: squares
            }),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length
        })

        

    }

    jumpTo=(step)=>{
        this.setState({
            stepNumber : step,
            xIsNext : step%2 === 0
        })
    }

    render() {

        const history = this.state.history;
        console.log("inside render history", history)
        const current = history[this.state.stepNumber];
        console.log("inside render current", current)
        const winer = calculateWinner(current.squares)
        const moves = history.map((step, move) => {
            const desc = move ? ' Go to #' + move : 'Start the game';
            return (
                <li className='gi' key={move}>
                    <button className='bu' onClick={() => { this.jumpTo(move) }}>
                        {desc}
                    </button>
                </li>
            )
        })
        let status = 'Start a game!!'
        if (winer) {
            // this.setState({
            //    status : 'Winner is ' + winer 
            // })
            status = 'Winner is ' + winer
        } else {
            if(this.state.history.length === 10){
                // this.setState({
                //     status : 'Match is tired!' 
                //  })
                status = 'Match is tired!'
            }else if(this.state.status !== 'Start a game!!'){
                // this.setState({
                //     status : 'Next player is ' + (this.state.xIsNext ? 'X' : 'O') 
                //  })
                status = 'Next player is ' + (this.state.xIsNext ? 'X' : 'O') 
            }
        }

        return (
            <div className='game'>
                <div className="game-board">
                    <Board onClick={(i) => this.handleClick(i)} squares={current.squares} />
                </div>
                <div className="game-info">
                    <ul style={{margin:"10px"}}>{status}</ul>
                    <ul>{moves}</ul>
                </div>
            </div>
        )
    }

    
}

const calculateWinner = (squares) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    for (var i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && (squares[a] === squares[c]) && (squares[c] === squares[b])) {
            console.log(a," ",b," ",c)
            return squares[a];
        }
    }

    return null
}