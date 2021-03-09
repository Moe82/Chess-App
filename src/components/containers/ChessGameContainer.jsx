import React, { Component } from 'react'
import { ChessboardView } from '../views'
import socket from "../../socket/socket";
import ReactLoading from 'react-loading';
import { MessageBox } from 'react-chat-elements'
import '../../App.css'

const Chess  = require("chess.js")

export class ChessGameContainer extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
       socket: socket,
       fen: "start", 
       color: this.props.match.params.color.charAt(0),
       history: [], 
       width: 400,
       waitingForOpponent: false, // change back to true al
       opponentUrl: `http://localhost:3001/${this.props.match.params.gameId}/${this.props.match.params.color == 'white' ? 'black' : "white"}/false`,
       isHost: this.props.match.params.isHost
    }
  }
  
  componentDidMount(){
    this.game = new Chess();
    if (this.state.isHost == "true") {
      this.state.socket.on('connect', () => {
        this.state.socket.emit('createRoom', { gameId: this.props.match.params.id }) 
      })
      this.state.socket.on("opponentConnected", ({}) => {
        this.setState({waitingForOpponent: false})
    })
    } else {
      this.state.socket.on('connect', () => {
        this.state.socket.emit('joinRoom', { gameId: this.props.match.params.id }) 
      })
    }
  
    this.state.socket.on("opponentMoved", ({ sourceSquare, targetSquare }) => {
      this.handleOpponentMove(sourceSquare, targetSquare)
    })
  }

  handleOpponentMove = (sourceSquare, targetSquare) => {
    // try to update game object with new move. 
    let move = this.game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q" 
    });
    // if the move if illegal, return.
    if (move === null) return
    // else, update the state. 
    this.setState(({ history, pieceSquare }) => ({
      fen: this.game.fen(),
      history: this.game.history({ verbose: true }),
    }));
  };

  handleOwnMove = ({sourceSquare, targetSquare}) => {
    // if user tries to move opponents piece, return.
    if (this.game.get(sourceSquare).color != this.state.color) return 

    // try to update game object with new move. 
    let move = this.game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q" 
    });

    // if the move if illegal, return. 
    if (move === null) return

    // else, update the state to reflect new move. 
    this.setState(({ history, pieceSquare }) => ({
      fen: this.game.fen(),
      history: this.game.history({ verbose: true }),
    }));

    this.state.socket.emit('movePiece', { gameId: this.props.match.params.id, sourceSquare: sourceSquare, targetSquare:targetSquare })
  };

  render() {
    return (
      this.state.waitingForOpponent && this.state.isHost == "true" ? 
      <React.Fragment>
        <h2>Send this link to your friend:</h2> 
        <h3>{this.state.opponentUrl}</h3>
        <ReactLoading className={"App-loading-bar"} type={"bars"} color={"#61dafb"} height={300} width={150} />
        <h4>Waiting for friend to connect...</h4>
      </React.Fragment> :
      <div style={{"width":"50%", "margin":"0 auto"}}>
        <ChessboardView 
          width={this.state.width} 
          position={this.state.fen}
          handleMove={this.handleOwnMove}
          color={this.props.match.params.color}
        />
      </div>
    )}
}
export default ChessGameContainer

