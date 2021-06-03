import React from 'react';
import { StylesProvider } from '@material-ui/styles';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'

import SmartHeader from 'components/SmartHeader'
import { TestEval, Dashboard, APITester } from 'pages'

import { Grid, Box, Container } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles';
import { UserStatusProvider } from 'Contexts/UserStatus';
import { SnackProvider } from 'Contexts/Snackbar';
import Snackbar from 'components/Snackbar';
import Home from 'pages/Home/Home';
import Problemset from 'pages/Problemset/Problemset';
import Users from 'pages/Users/Users';
import Standings from 'pages/Standings/Standings';
import Submissions from 'pages/Submissions/Submissions';

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
            <Box pt={2}>
            <Container>
            
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
            
            </Container>
            </Box>
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