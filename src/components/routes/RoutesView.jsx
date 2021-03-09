import React from 'react'
import { Switch, Route } from 'react-router-dom';
import { ChessGameContainer} from '../containers'
import { GameSelectView } from '../views'

export default function RoutesView(props) {
  return (
    <Switch>
      <Route exact path="/:gameId/:color/:isHost" component={ChessGameContainer}/>
      <Route exact path="/" component={GameSelectView}/>
    </Switch>
  )
}
