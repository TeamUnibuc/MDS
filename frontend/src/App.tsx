import React, { useEffect, useState } from 'react';

import { DefaultPage, TestEval, Bots, Users } from './pages';
import { Switch, Route, BrowserRouter as Router } from'react-router-dom'

function App() {

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route key="default" path="/" exact component={DefaultPage}/>
        <Route key="testeval" path="/testeval" exact component={TestEval}/>
        <Route key="bots" path="/bots" exact component={Bots} />
        <Route key="users" path="/users" exact component={Users} />
      </Switch>
    </Router>
  );
}

export default App;