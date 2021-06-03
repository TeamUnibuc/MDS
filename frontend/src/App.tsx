import { StylesProvider } from '@material-ui/styles';
import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'

import SmartHeader from 'components/SmartHeader'
import { Snackbar, SnackProvider } from 'components/Snackbar'
import { DefaultPage, TestEval, Dashboard, APITester, Standings, Problemset, Users, Submissions, Home } from 'pages'

import { Grid } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles';

// Daca vrem sa adaugam culori la theme, aici trebuie sa facem asta
const theme = createMuiTheme()

function App(): JSX.Element {
  return (
    <StylesProvider injectFirst>

    <ThemeProvider theme={theme}>
      <Router basename={process.env.PUBLIC_URL}>
      <SnackProvider>
        <Snackbar />

        <Grid container>
          <Grid item xs={12}>
            <SmartHeader activePage={'oh well'}/>
          </Grid>
          <Grid item xs={12}>

            <Switch>
              <Route key="Home" path="/" exact component={Home}/>
              <Route key="Problemset" path="/problemset" exact component={Problemset} />
              <Route key="Users" path="/users" exact component={Users} />
              <Route key="Standings" path="/standings" exact component={Standings}/>
              <Route key="Submissions" path="/submissions" exact component={Submissions}/>

              <Route key="apitester" path="/apitester" exact component={APITester}/>

              <Route key="testeval" path="/testeval" exact component={TestEval}/>

              <Route key="dashboard" path="/dashboard" exact component={Dashboard}/>
            </Switch>
          
          </Grid>
        </Grid>

      </SnackProvider>
      </Router>
    </ThemeProvider>
    </StylesProvider>
  );
}

export default App;