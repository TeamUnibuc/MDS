import React, { useState } from 'react';
import { useStyles } from '../SubmissionsAPIStyles';

import { Container, Button, Box } from '@material-ui/core'

export default function GetOneSubmission(): JSX.Element {
    const classes = useStyles();

    const [submissionId, setSubmissionId] = useState('Submission id...')

    const processSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        console.log("Got called");

        const reqBody = {
            submission_id: submissionId
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
        <h1>Retrieve One Submission</h1>
        <textarea
            style={{width: "90%"}}
            rows={1} 
            name={"Submission Id"}
            value={submissionId}
            onChange={(event) => setSubmissionId(event.target.value)}
        />


        <Box mt="20px" />

        <Box className={classes.buttonContainer}>
            <Button 
                onClick={processSubmit}
                variant="contained"
                color="primary"
            >Retrieve Submission</Button>
        </Box>
        
    </Container>;
}
