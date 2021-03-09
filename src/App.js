import React from 'react'
import RoutesContainer from './components/routes/RoutesContainer'
import {AppHeaderView} from './components/views'

function App() {
  return (
    <React.Fragment>
      <AppHeaderView/>
      <RoutesContainer />
    </React.Fragment>
  );
}

export default App;
