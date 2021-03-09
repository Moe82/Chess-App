import React from 'react'
import Chessboard from "chessboardjsx";
import '../../App.css'

function ChessboardView(props) {
  console.log(props.color)
  return (
    <div className={'Chessboard'}>
    <Chessboard
      width={props.width}
      position={props.position}
      onDrop={(move) => props.handleMove(move)}
      orientation={props.color}
      dropOffBoard={'snapback'}
      appearSpeed={'slow'}
      moveSpeed={99999}
      orientation={props.color}
    />
    </div>  
  )
}

export default ChessboardView