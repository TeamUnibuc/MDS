import React, { useState } from 'react';
import { useStyles } from './StandingsStyles';
import { AppBar, Tab, Tabs, Paper } from '@material-ui/core';
import { GlobalStandings } from './Components/';

export default function Standings() : JSX.Element {
    const [tabIndex, setTabIndex] = useState(0);
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" component={Paper}>
                <Tabs 
                    value={tabIndex} 
                    onChange={(event : React.ChangeEvent<unknown>, newIndex : number) => setTabIndex(newIndex)} 
                    aria-label="simple tabs example"
                >
                    <Tab label="Global Standings" />
                    <Tab label="Problem Standings" />
                </Tabs>
            </AppBar>
            {(tabIndex == 0) && <GlobalStandings />}
            {(tabIndex == 1) && null}
            
        </div>
    );
}