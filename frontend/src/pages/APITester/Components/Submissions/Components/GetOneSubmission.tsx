import React, { useState, useContext } from 'react';
import { useStyles } from '../SubmissionsAPIStyles';
import api from 'api';
import { ApiTesterContext } from '../../../ApiTesterContext';

import { Container, Button, Box } from '@material-ui/core'

export default function GetOneSubmission(): JSX.Element {
    const classes = useStyles();
    const { setApiResponse } = useContext(ApiTesterContext);

    const [SubmissionID, setSubmissionID] = useState('Submission id...')

    const processSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        console.log("Got called");

        const reqBody = {
            SubmissionID
        }

        console.log(reqBody);

        // const content = await api.Submissions.GetOne(reqBody);
        // console.log(content);
        // setApiResponse(JSON.stringify(content, undefined, 2));
        setApiResponse('{Submissions}');
    }

    return <Container className={classes.container}>
        <h1>Retrieve One Submission</h1>
        <textarea
            style={{width: "90%"}}
            rows={1} 
            name={"Submission Id"}
            value={SubmissionID}
            onChange={(event) => setSubmissionID(event.target.value)}
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
