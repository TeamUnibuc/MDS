import React from 'react';

import { DefaultPage, TestEval, AddGame, Login, Dashboard, SmartRegister } from './pages';
import { Switch, Route, BrowserRouter as Router } from'react-router-dom'

function App(): JSX.Element {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route key="default" path="/" exact component={DefaultPage}/>
        <Route key="testeval" path="/testeval" exact component={TestEval}/>
        <Route key="addgame" path="/addgame" exact component={AddGame}/>
        <Route key="login" path="/login" exact component={Login}/>
        <Route key="dashboard" path="/dashboard" exact component={Dashboard}/>
        <Route key="smartregister" path="/smartregister" exact component={SmartRegister}/>
      </Switch>
    </Router>
  );
}

export default App;