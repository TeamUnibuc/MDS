import React, { useState } from 'react';

import { DefaultPage, TestEval, AddGame, Dashboard } from './pages'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import SmartHeader from './components/SmartHeader'
import { Grid } from '@material-ui/core'

function App(): JSX.Element {
  const [pageName, setPageName] = useState('');

  return (
    <Grid container>
      <Router basename={process.env.PUBLIC_URL}>
      <Grid item xs={12}>
        <SmartHeader activePage={'oh well'}/>
      </Grid>
      <Grid item xs={12}>
        <Switch>
          <Route key="default" path="/" exact component={DefaultPage}/>
          <Route key="testeval" path="/testeval" exact component={TestEval}/>
          <Route key="addgame" path="/addgame" exact component={AddGame}/>
          <Route key="dashboard" path="/dashboard" exact component={Dashboard}/>
        </Switch>
      </Grid>
    </Router>
    </Grid>
  );
}

export default App;