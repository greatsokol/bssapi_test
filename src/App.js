import React, {Component} from 'react';
import './App.css';
import {Redirect, Route, Switch} from "react-router-dom";
import Auth from "./containers/Auth/Auth";
import DocList from "./containers/DocList/DocList";
import {connect} from "react-redux";
import DocView from "./containers/DocView/DocView";

class App extends Component {
  render () {
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
                  <Route path="/doc/:docid" component={DocView}/>
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
