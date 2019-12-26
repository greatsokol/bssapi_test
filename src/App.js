import React, {Component} from 'react';
import './App.css';
import {Redirect, Route, Switch} from "react-router-dom";
import Auth from "./containers/Auth/Auth";
import DocList from "./containers/DocList/DocList";
import {connect} from "react-redux";

class App extends Component {
  render () {
      console.log('App.render');

      let routes = (
        <Switch>
            <Route path="/auth" component={Auth}/>
            <Redirect to="/auth"/>
        </Switch>
      );

      if (sessionStorage.getItem('sid')) {
          routes = (
              <Switch>
                  <Route path="/list" component={DocList}/>
                  <Redirect to="/list"/>
              </Switch>
          );
      }

      return (
          <div>
            {routes}
          </div>
      )
  }
}

function mapStateToProps(state){
    return state;
}

export default connect(mapStateToProps)(App);
