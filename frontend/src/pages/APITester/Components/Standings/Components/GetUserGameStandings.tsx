import React, { useState, useContext } from 'react';
import { useStyles } from '../StandingsAPIStyles';
import { prettyJSON } from 'utils';
import api from 'api';
import { ApiTesterContext } from '../../../ApiTesterContext'

import { Container, Button, Box, TextField, MenuItem } from '@material-ui/core'

export default function GetUserGameStandings(): JSX.Element {
    const classes = useStyles();
    const { setApiResponse } = useContext(ApiTesterContext)

    const [GameID, setGameID] = useState('Game id ...');
    const [UserID, setUserID] = useState('User id ...');
    
    const processSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        console.log("Got called");

        const reqBody = {
            GameID,
            UserID
        }

        console.log(reqBody);

        // Example of how it should work, not fully working

        // const content = await api.Standings.UserGameStandings(reqBody);
        // console.log(content)
        // setApiResponse(prettyJSON(content));

        setApiResponse('{Lol}')
    }

    return <Container className={classes.container}>
        <h1>Get User Game Standings</h1>

        <textarea
            style={{width: "90%"}}
            rows={1} 
            name={"User"}
            value={UserID}
            onChange={(event) => setUserID(event.target.value)}
        />

        <Box mt="20px" />

        <textarea
            style={{width: "90%"}}
            rows={1} 
            name={"Game"}
            value={GameID}
            onChange={(event) => setGameID(event.target.value)}
        />

        <Box mt="20px" />

        <Box className={classes.buttonContainer}>
            <Button 
                onClick={processSubmit}
                variant="contained"
                color="primary"
            >Get User Game Standings</Button>
        </Box>
        
    </Container>;
}
