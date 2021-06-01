import React from 'react';
import { StylesProvider } from '@material-ui/styles';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'

import SmartHeader from 'components/SmartHeader'
import Snackbar from 'components/Snackbar'
import { DefaultPage, TestEval, Dashboard, APITester, Profile } from 'pages'

import { Grid } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles';
import { UserStatusProvider } from 'Contexts/UserStatus';
import { SnackProvider } from 'Contexts/Snackbar';

// Daca vrem sa adaugam culori la theme, aici trebuie sa facem asta
const theme = createMuiTheme()

function App(): JSX.Element {
  return (
    <StylesProvider injectFirst>
    <ThemeProvider theme={theme}>

      <Router basename={process.env.PUBLIC_URL}>
      <SnackProvider>
      <UserStatusProvider>

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
              <Route key="profile" path="/profile" exact component={Profile}/>

              <Route path='/deleteLogout' component={() => { 
                window.location.href = process.env.PUBLIC_URL + '/deleteLogout?info_msg=Account Deleted'; 
                return null;
              }}/>
            </Switch>
          </Grid>

        </Grid>

      </UserStatusProvider>
      </SnackProvider>
      </Router>

    </ThemeProvider>
    </StylesProvider>
  );
}

export default App;