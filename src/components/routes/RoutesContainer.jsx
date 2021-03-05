import React, { Component } from "react";
import RoutesView from './RoutesView'
import { withRouter } from "react-router-dom";

class RoutesContainer extends Component {
  render() {
    return (
      <div>
        <RoutesView />
      </div>
    )
  }
}
export default withRouter(RoutesContainer)
