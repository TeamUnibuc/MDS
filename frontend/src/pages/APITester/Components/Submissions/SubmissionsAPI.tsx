import React, { useState } from 'react';
// import { useStyles } from './SubmissionsAPIStyles';

import { TextField, MenuItem, Box } from '@material-ui/core';
import { GetAllSubmissions, GetOneSubmission, NewSubmission } from './Components'

export default function SubmissionsAPI() : JSX.Element {
    // const classes = useStyles();

    const [apiType, setApiType] = useState('Get All')

    const APITypes = ['Get All', 'Get One', 'Create New Submission']
    
    return (
        <>
            <Box mt="20px" />
            <label>
                Submission API to test:
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
            {(apiType === 'Get One') && <GetOneSubmission />}
            {(apiType === 'Create New Submission') && <NewSubmission />}
        </>
    );
}
