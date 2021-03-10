import React from 'react'
import Chessboard from "chessboardjsx";
import '../../App.css'

function ChessboardView(props) {
  return (
    <div className={'Chessboard'}>
    <Chessboard
      width={props.width}
      position={props.position}
      onDrop={(move) => props.handleMove(move)}
      orientation={props.color}
      dropOffBoard={'snapback'}
      orientation={props.color}
      dropSquareStyle={{ boxShadow: 'inset 0 0 1px 4px black' }}
      lightSquareStyle={{ backgroundColor: '#61dafb' }}
      darkSquareStyle={{ backgroundColor: '#6c99bb' }}
    />
    </div>  
  )
}

export default ChessboardView