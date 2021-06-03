import React, { useState } from 'react';
import { useStyles } from './APITesterStyles';
import { ApiTesterContext } from './ApiTesterContext'
import 'codemirror/keymap/sublime';
import 'codemirror/theme/elegant.css';
import CodeMirror from '@uiw/react-codemirror'

import { Box, TextField, MenuItem } from '@material-ui/core';
import CustomRequest from './Components/Custom/CustomRequest';
import GameAPI from './Components/Game/GameAPI';
import SubmissionsAPI from './Components/Submissions/SubmissionsAPI';
import StandingsAPI from './Components/Standings/StandingsAPI';
import UserAPI from './Components/User/UserAPI';
import AccountAPI from './Components/Account/AccountAPI';

export default function APITester() : JSX.Element{
    const classes = useStyles();

    const [api, setApi] = useState('Custom')
    const [apiResponse, setApiResponse] = useState('{}')

    const APIs = [ 'Custom', 'Games', 'User', 'Submission', 'Standings', 'Account']

    return (<ApiTesterContext.Provider value={ {apiResponse, setApiResponse} }>
        <Box className={classes.container}>
            <label>
                API to test:
            </label>
            
            <TextField 
                select
                value={api}
                onChange={(event) => setApi(event.target.value)}
                helperText="Please select API to test"
            >
                {APIs.map((option) => (
                <MenuItem key={option} value={option}>
                    {option}
                </MenuItem>
                ))}
            </TextField>

            {(api === 'Custom') && <CustomRequest />}
            {(api === 'Games') && <GameAPI />}
            {(api === 'Submission') && <SubmissionsAPI />}
            {(api === 'Standings') && <StandingsAPI />}
            {(api === 'User') && <UserAPI />}
            {(api === 'Account') && <AccountAPI />}

            <h2>Request Result:</h2>
            <Box style={{width:'500px', height: '300px'}}>
                <CodeMirror
                    value={apiResponse}                    
                    options={{
                        theme: 'elegant',
                        keyMap: 'sublime',
                        mode: 'javascript',
                        lineNumbers: true,
                        readOnly: true
                    }}
                />
            </Box>
        </Box>
    </ApiTesterContext.Provider>);
}

