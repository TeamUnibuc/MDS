import MenuIcon from '@material-ui/icons/Menu';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { getAuthStatus } from '../Fetch/auth';
import { AppBar } from '@material-ui/core';
import { Toolbar } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import { spacing } from '@material-ui/system';

interface Props
{
    activePage: string,
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

export default function SmartHeader({activePage}: Props): JSX.Element
{
    const classes = useStyles();

    const [user, setUser] = useState<{
        Username: string, 
        Email: string,
        Providers: {
          googleID?: string,
          facebookID?: string,
          twitterID?: string,
          githubID?: string, 
        }
      } | null>(null);
  
      const [error, setError] = useState('');
      const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  
      // Basically this is called only at start as it has no dependencies
      useEffect(() => {
        getAuthStatus()
          .then(responseJson => {
              if (responseJson.authenticated) {
                  setAuthenticated(true)
                  setUser(responseJson.user)
              }
              else {
                  setAuthenticated(false)
              }
          }).catch(err => {
              setAuthenticated(false)
              setError(String(err))
          });
      }, [])

    const handleSmartLoginClick = (provider: string) => {
        window.open(`auth/${provider}/smart`, "_self");
    };

    const handleLogoutClick = () => {
        // Set authenticated state to false in the HomePage component
        window.open(`auth/logout`, "_self");
    };
    
    return <AppBar position="static">
    <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
            {activePage}
        </Typography>
        {authenticated === null ? (
            <CircularProgress />
        ) : authenticated == true ? (
            <Button color="inherit" onClick={handleLogoutClick}>Logout</Button>
        ) : (<>
            <Typography align="right" variant="h6" className={classes.title}>
                Login:
            </Typography>
            <>
            <div style={{color: '#1ad1ff'}}>
            <Button style={{margin: '0.3em'}} variant="outlined" color="inherit" onClick={() => handleSmartLoginClick('facebook')}>
                Facebook
            </Button>
            </div>
            <div style={{color: '#DB4437'}}>
            <Button style={{margin: '0.3em'}} variant="outlined" color="inherit" onClick={() => handleSmartLoginClick('google')}>
                Google
            </Button>
            </div>
            <div style={{color: '#000033'}}>
            <Button style={{margin: '0.3em'}} variant="outlined" color="inherit" onClick={() => handleSmartLoginClick('github')}>
                Github
            </Button>
            </div>
            </>
        </>)}
    </Toolbar>
    </AppBar>
//   <ul className="menu">
//         <li>
//             <Link to="/">Home</Link>
//         </li>
//         {authenticated ? (
//             <li onClick={handleLogoutClick}>
//                 <Link to="#">Logout</Link>
//             </li>
//         ) : (<>
//             <li onClick={() => handleSmartLoginClick('google')}>
//                 <Link to="#">Google Login</Link>
//             </li>
            
//             <li onClick={() => handleSmartLoginClick('facebook')}>
//                 <Link to="#">Facebook Login</Link>
//             </li>
//             <li onClick={() => handleSmartLoginClick('github')}>
//                 <Link to="#">Github Login</Link>
//             </li>
//             </>
//         )}
//     </ul>;
}