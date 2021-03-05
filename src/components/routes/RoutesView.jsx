import React from 'react'
import { Switch, Route } from 'react-router-dom';
import { ChessGameContainer } from '../containers'
import { GameSelectView } from '../views'
export default function RoutesView() {
  return (
    <Switch>
      <Route exact path="/games/chess/:id" component={ChessGameContainer}/>
      <Route exact path="" component={GameSelectView }/>
    </Switch>
  )
}
