import React, {Component} from 'react';
import {connect} from "react-redux";
import './App.css';
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import Auth from "./containers/Auth/Auth";

class App extends Component {
  render () {
      let routes = (
        <Switch>
            <Route path="/" component={Auth}/>
            <Redirect to="/"/>
        </Switch>
      );

      return (
          <div>
            {routes}
          </div>
      )
  }
}

export default App;
