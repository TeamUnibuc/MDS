import React, { useState } from 'react';
// import { useStyles } from './AccountAPIStyles';

import { TextField, MenuItem, Box } from '@material-ui/core';
import { DeleteAccount, EditAccount, RetrieveInfo } from './Components'

export default function SubmissionsAPI() : JSX.Element {
    // const classes = useStyles();

    const [apiType, setApiType] = useState('Edit Account')

    const APITypes = ['Edit Account', 'Retrieve Info', 'Delete Account']
    
    return (
        <>
            <Box mt="20px" />
            <label>
                Account API to test:
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

            {(apiType === 'Edit Account') && <EditAccount />}
            {(apiType === 'Retrieve Info') && <RetrieveInfo />}
            {(apiType === 'Delete Account') && <DeleteAccount />}
        </>
    );
}
