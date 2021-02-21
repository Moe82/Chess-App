import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ChessboardContainer } from '../containers'

export default function RoutesView() {
  return (
    <Router>
      <Switch>
        <Route path="/games/chess">
          <ChessboardContainer />
        </Route>
      </Switch>
    </Router>
  )
}
