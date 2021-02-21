import React, { Component } from 'react'
import { ChessboardView } from '../views'

const Chess  = require("chess.js")

class ChessboardContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      fen: "start",
      dropSquareStyle: {},
      squareStyles: {},
      pieceSquare: "",
      square: "",
      history: [],
      width:400
    };
  }
  componentDidMount() {
    this.game = new Chess();
  }

  handleMove = ({ sourceSquare, targetSquare }) => {
    // see if the move is legal
    let move = this.game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q" 
    });

    // illegal move
    if (move === null) {
      console.log("Bad Move")
      return;
    }
    this.setState(({ history, pieceSquare }) => ({
      fen: this.game.fen(),
      history: this.game.history({ verbose: true }),
    }));
  };

  render() {
    return <ChessboardView 
      width={this.state.width} 
      position={this.state.fen}
      handleMove={this.handleMove}
      />
  }
}

export default ChessboardContainer;