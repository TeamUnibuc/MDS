import React, { useContext } from 'react';
import { useStyles } from '../AccountAPIStyles';
import { prettyJSON } from 'utils';
import api from 'api';
import { ApiTesterContext } from '../../../ApiTesterContext'

import { Container, Button, Box } from '@material-ui/core'

export default function DeleteAccount(): JSX.Element {
    const classes = useStyles();
    const { setApiResponse } = useContext(ApiTesterContext)

    const processSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        console.log("Got called");

        const reqBody = {}

        console.log(reqBody);

        // Example of how it should work, not fully working

        const content = await api.Account.DeleteAccount(reqBody);
        console.log(content)
        setApiResponse(prettyJSON(content));

        // setApiResponse('{Lol}')
    }

    return <Container className={classes.container}>
        <h1>Delete Account</h1>

        <Box mt="20px" />

        <Box className={classes.buttonContainer}>
            <Button 
                onClick={processSubmit}
                variant="contained"
                color="secondary"
            >Delete Account</Button>
        </Box>
        
    </Container>;
}
