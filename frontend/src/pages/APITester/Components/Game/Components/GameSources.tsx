import React, { useState, useContext } from 'react';
import { useStyles } from '../GameAPIStyles';
import api from 'api';
import { ApiTesterContext } from '../../../ApiTesterContext';

import { Container, Button, Box } from '@material-ui/core'

export default function GameSource(): JSX.Element {
    const classes = useStyles();
    const { setApiResponse } = useContext(ApiTesterContext);

    const [GameID, setGameID] = useState('Game id...')

    const processSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        console.log("Got called");

        const reqBody = {
            GameID
        }

        console.log(reqBody);

        // const content = await api.Games.Sources(reqBody);
        // console.log(content);
        // setApiResponse(JSON.stringify(content, undefined 2));
        setApiResponse('{Lol}')
    }

    return <Container className={classes.container}>
        <h1>Delete Game</h1>
        <textarea
            style={{width: "90%"}}
            rows={1} 
            name={"Game Id"}
            value={GameID}
            onChange={(event) => setGameID(event.target.value)}
        />

        <Box mt="20px" />

        <Box className={classes.buttonContainer}>
            <Button 
                onClick={processSubmit}
                variant="contained"
                color="primary"
            >Get Sources</Button>
        </Box>
        
    </Container>;
}
