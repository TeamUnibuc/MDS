import React, { useState, useContext } from 'react';
import { useStyles } from '../StandingsAPIStyles';
import { ApiTesterContext } from '../../../ApiTesterContext'

import { Container, Button, Box } from '@material-ui/core'

export default function GetUserGlobalStandings(): JSX.Element {
    const classes = useStyles();
    const { setApiResponse } = useContext(ApiTesterContext)

    const [UserID, setUserID] = useState('User id ...');
    
    const processSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        console.log("Got called");

        const reqBody = {
            UserID
        }

        console.log(reqBody);

        // Example of how it should work, not fully working

        const content = await api.Standings.UserGlobalStandings(reqBody);
        console.log(content)
        setApiResponse(prettyJSON(content));

        // setApiResponse('{Lol}')
    }

    return <Container className={classes.container}>
        <h1>Get User Global Standings</h1>

        <textarea
            style={{width: "90%"}}
            rows={1} 
            name={"User"}
            value={UserID}
            onChange={(event) => setUserID(event.target.value)}
        />

        <Box mt="20px" />

        <Box className={classes.buttonContainer}>
            <Button 
                onClick={processSubmit}
                variant="contained"
                color="primary"
            >Get User Global Standings</Button>
        </Box>
        
    </Container>;
}
