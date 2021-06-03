import React, { useState, useContext } from 'react';
import { useStyles } from '../SubmissionsAPIStyles';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/elegant.css';
import api from 'api';
import { ApiTesterContext } from '../../../ApiTesterContext';

import { Container, Button, Box } from '@material-ui/core'
import CodeMirror from '@uiw/react-codemirror'
import { prettyJSON } from 'utils';

export default function NewSubmission(): JSX.Element {
    const classes = useStyles();
    const { setApiResponse } = useContext(ApiTesterContext);

    const [submissionCode, setSubmissionCode] = useState('C++ code of the submission ...')
    const [gameId, setGameId] = useState('Game id ...')

    const processSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        console.log("Got called");

        const reqBody = {
            SubmissionCode: submissionCode,
            GameID: gameId
        }

        console.log(reqBody);

        const content = await api.Submissions.NewSubmission(reqBody);
        console.log(content);
        setApiResponse(prettyJSON(content));
        // setApiResponse('{Submissions}');
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


        <Box width="90%">
            <label>
                Submission C++ code:
            </label>
            <Box mt="20px" />
            <Box height="300px" width="100%">
                <CodeMirror
                    value={submissionCode}
                    onChange={(instance : CodeMirror.Editor) => setSubmissionCode(instance.getValue())}
                    options={{
                        theme: 'elegant',
                        keyMap: 'sublime',
                        mode: 'c++',
                        lineNumbers: true,
                    }}
                />
            </Box>
            
            <Box mt="20px" />
        </Box>
        


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
