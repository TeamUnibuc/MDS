import React, { useState } from 'react';
// import { useStyles } from './UserAPIStyles';

import { TextField, MenuItem, Box } from '@material-ui/core';
import { GetUser } from './Components'

export default function SubmissionsAPI() : JSX.Element {
    // const classes = useStyles();

    const [apiType, setApiType] = useState('Get')

    const APITypes = ['Get']
    
    return (
        <>
            <Box mt="20px" />
            <label>
                User API to test:
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

            {(apiType === 'Get') && <GetUser />}
        </>
    );
}
