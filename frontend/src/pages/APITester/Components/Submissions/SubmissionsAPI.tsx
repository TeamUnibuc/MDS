import React, { useState } from 'react';
import { useStyles } from './SubmissionsAPIStyles';

import { TextField, MenuItem, Box } from '@material-ui/core';
// import { AddGame, DeleteGame, GetAllGames, GetOneGame, GameSources } from './Components';
import { GetAllSubmissions } from './Components'

export default function GameAPI() : JSX.Element {
    const classes = useStyles();

    const [apiType, setApiType] = useState('Get All')

    const APITypes = ['Get All', 'Get One', 'Alter or Add Submission', 'Delete Submission', 'Get Sources']
    
    return (
        <>
            <Box mt="20px" />
            <label>
                API to test:
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

            {(apiType === 'Get All') && <GetAllSubmissions />}
            {/* {(apiType === 'Get One') && <GetOneGame />} */}
            {/* {(apiType === 'Alter or Add Game') && <AddGame />} */}
            {/* {(apiType === 'Delete Game') && <DeleteGame />} */}
            {/* {(apiType === 'Get Sources') && <GameSources />} */}
        </>
    );
}
