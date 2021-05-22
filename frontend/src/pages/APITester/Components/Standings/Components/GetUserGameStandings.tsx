import React, { useState, useContext } from 'react';
import { useStyles } from '../StandingsAPIStyles';
import api from 'api';
import { ApiTesterContext } from '../../../ApiTesterContext'

import { Container, Button, Box, TextField, MenuItem } from '@material-ui/core'

export default function GetUserGameStandings(): JSX.Element {
    const classes = useStyles();
    const { setApiResponse } = useContext(ApiTesterContext)

    const [gameId, setGameId] = useState('Game id ...');
    const [userId, setUserId] = useState('User id ...');
    
    const processSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        console.log("Got called");

        const reqBody = {
            game_id: gameId,
            user_id: userId
        }

        console.log(reqBody);

        // Example of how it should work, not fully working

        // const data = await api.Games.GetAll(reqBody);
        // console.log(data)

        setApiResponse('{Lol}')
    }

    return <Container className={classes.container}>
        <h1>Get User Game Standings</h1>

        <textarea
            style={{width: "90%"}}
            rows={1} 
            name={"User"}
            value={userId}
            onChange={(event) => setUserId(event.target.value)}
        />

        <Box mt="20px" />

        <textarea
            style={{width: "90%"}}
            rows={1} 
            name={"Game"}
            value={gameId}
            onChange={(event) => setGameId(event.target.value)}
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
