import React, { useState, useContext } from 'react';
import { useStyles } from '../AccountAPIStyles';
import { prettyJSON } from 'utils';
import api from 'api';
import { ApiTesterContext } from '../../../ApiTesterContext'

import { Container, Button, Box, TextField, MenuItem, Checkbox, FormControlLabel } from '@material-ui/core'

export default function EditAccount(): JSX.Element {
    const classes = useStyles();
    const { setApiResponse } = useContext(ApiTesterContext);

    const [FirstName, setFirstName] = useState('First Name ...');
    const [LastName, setLastName] = useState('Last Name ...');
    const [Username, setUsername] = useState('Username ...')
    const [VisibleEmail, setVisibleEmail] = useState(true);

    const processSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        console.log("Got called");

        const reqBody = {
            FirstName,
            LastName,
            Username,
            VisibleEmail
        }

        console.log(reqBody);

        // Example of how it should work, not fully working

        // const content = await api.Account.EditAccount(reqBody);
        // console.log(content)
        // setApiResponse(prettyJSON(content));

        setApiResponse('{Lol}')
    }

    return <Container className={classes.container}>
        <h1>Edit Account</h1>

        <Box mt="20px" />

        <textarea
            style={{width: "90%"}}
            rows={1} 
            name={"First Name"}
            value={FirstName}
            onChange={(event) => setFirstName(event.target.value)}
        />

        <Box mt="20px" />

        <textarea
            style={{width: "90%"}}
            rows={1} 
            name={"Last Name"}
            value={LastName}
            onChange={(event) => setLastName(event.target.value)}
        />

        <Box mt="20px" />

        <textarea
            style={{width: "90%"}}
            rows={1} 
            name={"Username"}
            value={Username}
            onChange={(event) => setUsername(event.target.value)}
        />

        <FormControlLabel 
            control={<Checkbox checked={VisibleEmail} onChange={(event) => setVisibleEmail(event.target.checked)} />}
            label="Email is Visible"
        />

        <Box className={classes.buttonContainer}>
            <Button 
                onClick={processSubmit}
                variant="contained"
                color="primary"
            >Edit Account</Button>
        </Box>
        
    </Container>;
}
