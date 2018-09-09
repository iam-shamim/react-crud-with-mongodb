import React, { Component } from 'react';
import './App.css';
import { NavLink, Route, Switch } from 'react-router-dom'
import GamesPage from './GamesPage'
import GameFormPage from './GameFormPage'

class App extends Component {
  render() {
    return (
      <div className="ui container">
          <div className="ui three item menu">
              <NavLink className="item" activeClassName="active" exact to="/">Home</NavLink>
              <NavLink className="item" activeClassName="active" exact to="/games">Games</NavLink>
              <NavLink className="item" activeClassName="active" exact to="/games/new">Add New Game</NavLink>
          </div>

          <Switch>
              <Route path="/games/new" component={GameFormPage}/>
              <Route path="/games" exact component={GamesPage}/>
              <Route path="/games/:_id" component={GameFormPage}/>
          </Switch>
      </div>
    );
  }
}


export default App;
