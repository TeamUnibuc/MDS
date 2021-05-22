import React, { useState } from 'react';
import { useStyles } from '../SubmissionsAPIStyles';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/elegant.css';

import { Container, Button, Box } from '@material-ui/core'
import CodeMirror from '@uiw/react-codemirror'

export default function NewSubmission(): JSX.Element {
    const classes = useStyles();

    const [submissionCode, setSubmissionCode] = useState('C++ code of the submission ...')
    const [gameId, setGameId] = useState('Game id ...')

    const processSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        console.log("Got called");

        const reqBody = {
            submission_code: submissionCode,
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
        <h1>Create a new Submission</h1>
        <textarea
            style={{width: "90%"}}
            rows={1} 
            name={"Game Id"}
            value={gameId}
            onChange={(event) => setGameId(event.target.value)}
        />


        <textarea
            style={{width: "90%"}}
            rows={20} 
            name={"Submission Id"}
            value={submissionCode}
            onChange={(event) => setSubmissionCode(event.target.value)}
        />


        <Box mt="20px" />

        <Box className={classes.buttonContainer}>
            <Button 
                onClick={processSubmit}
                variant="contained"
                color="primary"
            >Create New Submission</Button>
        </Box>
        
    </Container>;
}
