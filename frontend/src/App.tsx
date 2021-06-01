import { StylesProvider } from '@material-ui/styles';
import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'

import SmartHeader from 'components/SmartHeader'
import { Snackbar, SnackProvider } from 'components/Snackbar'
import { DefaultPage, TestEval, Dashboard, APITester } from 'pages'

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
              <Route key="default" path="/" exact component={DefaultPage}/>
              <Route key="testeval" path="/testeval" exact component={TestEval}/>
              <Route key="dashboard" path="/dashboard" exact component={Dashboard}/>
              <Route key="apitester" path="/apitester" exact component={APITester}/>
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