import React, { useEffect, useState } from 'react'

import Box from '@material-ui/core/Box';
import MenuIcon from '@material-ui/icons/Menu';
import { AppBar } from '@material-ui/core';
import { Toolbar } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';

import './SmartHeader.css'
import { useUserStatus } from 'Contexts/UserStatus';
import Sidebar from './Sidebar';

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

const SmartHeader = ({activePage}: Props): JSX.Element =>
{
    const classes = useStyles();

    // const [user, setUser] = useState<AuthUser | null>(null)
    // const [authenticated, setAuthenticated] = useState<boolean | null>(null)
    const {state, reloadUserState} = useUserStatus()

    const {user, authenticated} = state

    const [drawerOpen, setDrawerOpen] = useState(false)

    // Basically this is called only at start as it has no dependencies
    useEffect(() => {
        reloadUserState()
    }, [])

    const handleSmartLoginClick = (provider: string) => {
        window.open(`/auth/${provider}/smart`, "_self");
    };

    const handleLogoutClick = () => {
        // Set authenticated state to false in the HomePage component
        window.open(`/auth/logout`, "_self");
    };

    const toggleDrawer = () => {
        console.log('Toggled Drawer!!')
        setDrawerOpen(!drawerOpen)
    }
    
    return <>
    <Sidebar open={drawerOpen} toggleDrawer={toggleDrawer}/>
    <AppBar position="static">
    <Toolbar>
        <IconButton 
            edge="start" 
            className={classes.menuButton} 
            color="inherit" 
            aria-label="menu"
            onClick={toggleDrawer}>
            <MenuIcon />
        </IconButton>

        <Typography variant="h6" className={classes.title}>
            {activePage}
        </Typography>
        
        {authenticated === null ? (
        
            <CircularProgress color="secondary"/>
        
        ) : authenticated === true ? (<>
        
        <Box mr={2}>
            <Typography align="right" variant="h6" className={classes.title}>
                {user?.Username}
            </Typography>
        </Box>
        <Button variant="contained" color="secondary" size="small" onClick={handleLogoutClick}>
            Logout
        </Button>
       
        </>) : (<>
        
            {/* <Box mr={2}>
                <Typography align="right" className={classes.title}>
                    Login
                </Typography>
            </Box> */}
            <>
            <Button className='btn-login-facebook' variant="contained" color="inherit" size="small" onClick={() => handleSmartLoginClick('facebook')}>
                Facebook
            </Button>
            <Button className='btn-login-google' variant="contained" color="inherit" size="small" onClick={() => handleSmartLoginClick('google')}>
                Google
            </Button>
            <Button className='btn-login-github' variant="contained" color="inherit" size="small" onClick={() => handleSmartLoginClick('github')}>
                Github
            </Button>
       
            </>
        </>)}
    </Toolbar>
    </AppBar>
    </>
}

export default SmartHeader;
