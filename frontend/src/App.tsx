import React from 'react';

import { DefaultPage, TestEval, AddGame, Dashboard } from './pages';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'

function App(): JSX.Element {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route key="default" path="/" exact component={DefaultPage}/>
        <Route key="testeval" path="/testeval" exact component={TestEval}/>
        <Route key="addgame" path="/addgame" exact component={AddGame}/>
        <Route key="dashboard" path="/dashboard" exact component={Dashboard}/>
      </Switch>
    </Router>
  );
}

export default App;