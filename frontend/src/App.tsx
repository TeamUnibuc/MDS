import React, { useEffect, useState } from 'react';

import { DefaultPage, TestEval, AddGame } from './pages';
import { Switch, Route, BrowserRouter as Router } from'react-router-dom'

function App() {

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route key="default" path="/" exact component={DefaultPage}/>
        <Route key="testeval" path="/testeval" exact component={TestEval}/>
        <Route key="addgame" path="/addgame" exact component={AddGame}/>
      </Switch>
    </Router>
  );
}

export default App;