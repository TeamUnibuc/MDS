import React from 'react';
import { StylesProvider } from '@material-ui/styles';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'

import SmartHeader from 'components/SmartHeader'
import Snackbar from 'components/Snackbar';
import Footer from './components/Footer/Footer';
import { TestEval, Dashboard, APITester, Submissions, Submission, Standings, Users, Problemset, Home, Documentation } from 'pages'

import { Grid, Box, Container, CssBaseline } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles';
import { UserStatusProvider } from 'Contexts/UserStatus';
import { SnackProvider } from 'Contexts/Snackbar';

// Daca vrem sa adaugam culori la theme, aici trebuie sa facem asta
const theme = createMuiTheme({
  palette: {
    background:{
      default: '#CDDDDD'
    }
  }
})

function App(): JSX.Element {
  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router basename={process.env.PUBLIC_URL}>
          <SnackProvider>
            <UserStatusProvider>

              <Snackbar />

              <Grid container>

                <Grid item xs={12}>
                  <SmartHeader activePage={'Fight Bots'}/>
                </Grid>

                <Grid item xs={12}>
                  <Box pt={2} paddingBottom="100px">
                    <Container style={{display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1, width: '100%'}}>
                  
                      <Switch>
                        <Route key="Home" path="/" exact component={Home}/>
                        <Route key="Problemset" path="/problemset" component={Problemset} />
                        <Route key="Users" path="/users" exact component={Users} />
                        <Route key="Standings" path="/standings" exact component={Standings}/>
                        <Route key="Submissions" path="/submissions" exact component={Submissions}/>
                        <Route key="Submission" path="/submission" component={Submission}/>
                        <Route key="Documentation" path="/documentation" component={Documentation}/>
                        
                        <Route key="apitester" path="/apitester" exact component={APITester}/>

                        <Route key="testeval" path="/testeval" exact component={TestEval}/>

                        <Route key="dashboard" path="/dashboard" exact component={Dashboard}/>
                      </Switch>
                      <Footer />
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