import React, { useState, useEffect } from 'react';
import { useStyles } from './SubmissionStyles';
import { CircularProgress, Box } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import api from 'api';
import { GetOneResults } from 'api/Submissions/GetOne';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/elegant.css';
import CodeMirror from '@uiw/react-codemirror';

export default function Submission() : JSX.Element {
    const [Submission, setSubmission] = useState<undefined | GetOneResults>();
    const classes = useStyles();
    const id_from_link = new URLSearchParams(useLocation().search).get('id');

    // on mount
    useEffect(() => {
        if (id_from_link){
            const reqBody = {
                SubmissionID : id_from_link
            }
            api.Submissions.GetOne(reqBody)
                .then(res => setSubmission(res))
                .catch(err => console.log(err))
        }        
    }, [])

    if (!Submission){
        return <CircularProgress />
    }

    if (Submission.status === 'fail'){
        return <div>{Submission.error_message}</div>
    }

    return (
        <Box className={classes.pageContainer}>
            <h1>{`${Submission.AuthorUsername}'s submission`}</h1>
            <h3>{`${Submission.Score} points`}</h3>

            <h2>Code:</h2>
            <Box height="300px" className={classes.codeMirrorContainer}>
                <CodeMirror
                    value={Submission.SubmissionCode}                    
                    options={{
                        theme: 'elegant',
                        keyMap: 'sublime',
                        mode: 'c++',
                        lineNumbers: true,
                        readOnly: true
                    }}
                />
            </Box>

            <h2>Fight Results:</h2>
            {Submission.results.map( (result, idx) => <ResultEntry key={idx} {...result} /> )}
        </Box>
    );
}

function ResultEntry({logs, won} : {logs : string, won : boolean}) : JSX.Element {
    const classes = useStyles();

    return (
        <>
            {won && <h5>Battle was <span style={{color: 'green'}}>won!</span></h5>}
            {!won && <h5>Battle was <span style={{color: 'red'}}>lost!</span></h5>}
            <h5>Logs:</h5>
            <Box height="300px" className={classes.codeMirrorContainer}>
                <CodeMirror
                    value={logs}                    
                    options={{
                        theme: 'elegant',
                        keyMap: 'sublime',
                        mode: 'textile',
                        lineNumbers: true,
                        readOnly: true
                    }}
                />
            </Box>            
        </>
    );
}