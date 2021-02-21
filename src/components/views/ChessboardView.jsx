import React from 'react'
import Chessboard from "chessboardjsx";

function ChessboardView(props) {
  return (
    <div>
      <Chessboard
        width={props.width}
        position={props.position}
        onDrop={(move) => props.handleMove(move)}
      />
    </div>
  )
}

export default ChessboardView