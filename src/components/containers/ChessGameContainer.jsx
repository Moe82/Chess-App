import React, { Component } from 'react'
import { ChessboardView } from '../views'
import socket from "../../socket/socket"
import ReactLoading from 'react-loading'
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import { MainContainer, ChatContainer, MessageList, Message, MessageInput } from '@chatscope/chat-ui-kit-react'

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
       width: 700,
       waitingForOpponent: true,
       opponentUrl: `http://localhost:3001/${this.props.match.params.gameId}/${this.props.match.params.color == 'white' ? 'black' : "white"}/false`,
       isHost: this.props.match.params.isHost,
       messages: [],
    }
  }
  
  componentDidMount(){
    this.game = new Chess();
    this.state.socket.emit('joinRoom', { gameId: this.props.match.params.gameId }) 
    this.state.socket.on("opponentConnected", ({}) => {
      this.setState({waitingForOpponent: false})
    })
    this.state.socket.on("opponentMoved", ({ sourceSquare, targetSquare }) => {
      this.handleOpponentMove(sourceSquare, targetSquare)
    })
    this.state.socket.on("opponentSentMsg", (message) => {
      this.setState({ messages: this.state.messages.concat({message: message, direction:"incoming"})})
    })
    this.state.socket.on("currentGameState", (fen) => {
      this.game.load(fen)
      this.setState({fen:fen})
    })
    this.state.socket.on("gameOver", (winner) => {
      window.alert(`${winner} won!`)
      this.game = new Chess();
      this.setState({fen:"start"})
    })
  }

  handleOpponentMove = (sourceSquare, targetSquare) => {
    // update game object with new move. 
    let move = this.game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q" 
    }); 
    this.setState(({ history, pieceSquare }) => ({
      fen: this.game.fen(),
      history: this.game.history({ verbose: true }),
    }));
     if (this.game.in_checkmate() == true) {
       this.state.socket.emit('resetBoard', {gameId: this.props.match.params.gameId, winner: this.props.match.params.color == 'white' ? 'black' : 'white'})
     }
  };

  handleUserMove = ({sourceSquare, targetSquare}) => {
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
    this.state.socket.emit('movePiece', { gameId: this.props.match.params.gameId, sourceSquare: sourceSquare, targetSquare:targetSquare, fen:this.game.fen()})
    
  };

  handleOutgoingMsg = (value) => {
    this.setState({ messages: this.state.messages.concat({message: value, direction:"outgoing"}) })
    this.state.socket.emit('sendMessage', { gameId: this.props.match.params.gameId, message:value})
  }
  
  render() {
    return (
      this.state.waitingForOpponent && this.state.isHost == "true" ? 
      <React.Fragment>
        <h2>Send this link to your friend:</h2> 
        <h3>{this.state.opponentUrl}</h3>
        <ReactLoading className={"App-loading-bar"} type={"bars"} color={"#61dafb"} height={300} width={150} />
        <h4>Waiting for friend to connect...</h4>
      </React.Fragment> :
      <div style={{"width":"75%", height:"100%", "margin":"0 auto"}}>
        <div style={{ float:"left", width:"50%"}}>
          <ChessboardView width={this.state.width} position={this.state.fen} handleMove={this.handleUserMove} color={this.props.match.params.color} />
        </div>
        <div style={{ height: "700px", width: "500px", float:"right"}}>
          <MainContainer>
            <ChatContainer>       
              <MessageList
                children = {this.state.messages.map((message) => {
                  return <Message model={message}> </Message>
                })}
              />
              <MessageInput placeholder="Type message here" onSend={this.handleOutgoingMsg}/>        
            </ChatContainer>
          </MainContainer>
        </div>
      </div>
    )
  }
}

export default ChessGameContainer

