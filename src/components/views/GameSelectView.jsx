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

  const handleAIBtnClick = () => {
    window.alert("Sorry, this feature is not yet ready! Try playing with a friend.")
  }

  return (
    <div style={{"textAlign": "center"}}>
      <Button className="App-btn" variant="primary" onClick={handleFriendBtnClick}> Play a Friend </Button>{' '} <br />
      <Button className="App-btn" variant="primary" size="big" onClick={handleAIBtnClick}> Battle The AI </Button>{' '} 
    </div>
  );
}

export default GameSelectView;
