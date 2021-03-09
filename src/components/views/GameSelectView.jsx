import React, { useState } from 'react'
import { nanoid } from 'nanoid'
import Button from 'react-bootstrap/Button';

function GameSelectView(props) {  
  const handleFriendBtnClick = () => {
    let colors = ["white","black"];
    let userColor = colors[Math.floor(Math.random()*colors.length)];
    const gameId = nanoid()
    const userUrl = (`/${gameId}/${userColor}/true`)
    props.history.push(userUrl)
  }

  return (
    <div style={{"textAlign": "center"}}>
      <Button className="App-btn" variant="primary" onClick={handleFriendBtnClick}> Play a Friend </Button>{' '} <br />
      <Button className="App-btn" variant="primary" size="big"> Battle The AI </Button>{' '} 
    </div>
  )
}

export default GameSelectView
