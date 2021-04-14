import React, { useEffect, useState } from 'react';

import { DefaultPage, TestEval } from './pages';
import { Switch, Route } from'react-router-dom'

function App() {

  return (
    <Switch>
      <Route key="default" path="/" exact component={DefaultPage}/>
      <Route key="testeval" path="/testeval" exact component={TestEval}/>
    </Switch>
  );
}

export default App;