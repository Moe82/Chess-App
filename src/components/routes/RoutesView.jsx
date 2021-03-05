import React from 'react'
import { Switch, Route } from 'react-router-dom';
import { ChessboardContainer } from '../containers'
import { GameSelectContainer } from '../containers'
export default function RoutesView() {
  return (
    <Switch>
      <Route exact path="/games/chess/:id" component={ChessboardContainer}/>
      <Route exact path="" component={GameSelectContainer }/>
    </Switch>
  )
}
