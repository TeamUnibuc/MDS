import React from 'react';

import { DefaultPage, TestEval, AddGame, Dashboard } from './pages'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import SmartHeader from './components/SmartHeader'
import { Container, Grid } from '@material-ui/core'
import { spacing } from '@material-ui/system'

function App(): JSX.Element {
  return (
    <Container maxWidth={false} disableGutters>
    <Grid container>
      <Router basename={process.env.PUBLIC_URL}>
      <Grid item xs={12}>
        <SmartHeader />
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
    </Container>

    // <MainGrid>
    //   <SmartHeader />
    //   <Router basename={process.env.PUBLIC_URL}>
    //   <Switch>
    //     <Route key="default" path="/" exact component={DefaultPage}/>
    //     <Route key="testeval" path="/testeval" exact component={TestEval}/>
    //     <Route key="addgame" path="/addgame" exact component={AddGame}/>
    //     <Route key="dashboard" path="/dashboard" exact component={Dashboard}/>
    //   </Switch>
    //   </Router>
    // </MainGrid>
    
  );
}

export default App;