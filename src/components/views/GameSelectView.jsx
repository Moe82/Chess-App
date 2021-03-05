import React from 'react'
import { Link } from "react-router-dom";
import { nanoid } from 'nanoid'

function GameSelectView(props) {  
  return (
    <div>
      <Link to={`/games/chess/${nanoid()}`} className="btn btn-primary">Play a friend</Link> <br />
      <Link to={"/games/chess/AI"} className="btn btn-primary">Battle the AI</Link>
    </div>
  )
}

export default GameSelectView
