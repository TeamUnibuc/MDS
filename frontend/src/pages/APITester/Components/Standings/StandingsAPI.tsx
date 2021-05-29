import React, { useState } from 'react';
import { useStyles } from './StandingsAPIStyles';

import { TextField, MenuItem, Box } from '@material-ui/core';

import { GetGlobalStandings, GetProblemStandings, GetUserGameStandings, GetUserGlobalStandings } from './Components'

export default function StandingsAPI() : JSX.Element {
    const classes = useStyles();

    const [apiType, setApiType] = useState('Get Problem Standings')

    const APITypes = ['Get Problem Standings', 'Get Global Standings', 'Get User Game Standings', 'Get User Global Standings']
    
    return (
        <>
            <Box mt="20px" />
            <label>
                Standings API to test:
            </label>
            
            <TextField 
                select
                value={apiType}
                onChange={(event) => setApiType(event.target.value)}
                helperText="Please select API Type to test"
            >
                {APITypes.map((option) => (
                <MenuItem key={option} value={option}>
                    {option}
                </MenuItem>
                ))}
            </TextField>

            {(apiType === 'Get Problem Standings') && <GetProblemStandings />}
            {(apiType === 'Get Global Standings') && <GetGlobalStandings />}
            {(apiType === 'Get User Game Standings') && <GetUserGameStandings />}
            {(apiType === 'Get User Global Standings') && <GetUserGlobalStandings />}
        </>
    );
}
