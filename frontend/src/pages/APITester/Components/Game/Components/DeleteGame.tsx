import React, { useState } from 'react';
import { useStyles } from '../GameAPIStyles';

import { Container, Button, Box } from '@material-ui/core'

export default function DeleteGame(): JSX.Element {
    const classes = useStyles();

    const [gameId, setGameId] = useState('Game id...')

    const processSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        console.log("Got called");

        const reqBody = {
            game_id: gameId
        }

        console.log(reqBody);

        // TO DO: implement api on front end

        // const data = await fetch('api/new_game', {
        //     method: "POST",
        //     headers:{
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(reqBody)
        // })
        // const content = await data.json()
        // console.log(content)
    }

    return <Container className={classes.container}>
        <h1>Delete Game</h1>
        <textarea
            style={{width: "90%"}}
            rows={1} 
            name={"Game Id"}
            value={gameId}
            onChange={(event) => setGameId(event.target.value)}
        />

        <Box mt="20px" />

        <Box className={classes.buttonContainer}>
            <Button 
                onClick={processSubmit}
                variant="contained"
                color="secondary"
            >Delete</Button>
        </Box>
        
    </Container>;
}
