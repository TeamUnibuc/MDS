import React, { useState, useContext } from 'react';
import { useStyles } from '../GameAPIStyles';
import { prettyJSON } from 'utils';
import api from 'api';
import { ApiTesterContext } from '../../../ApiTesterContext';

import { Container, Button, Box } from '@material-ui/core';

export default function DeleteGame(): JSX.Element {
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

        // const content = await api.Games.Delete(reqBody);
        // console.log(content);
        // setApiResponse(prettyJSON(content));
        setApiResponse('{Lol}');
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
                color="secondary"
            >Delete</Button>
        </Box>
        
    </Container>;
}
