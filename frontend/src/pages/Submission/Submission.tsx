import React, { useState, useEffect } from 'react';
import { Container, CircularProgress, Box } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import api from 'api';
import { GetOneResults } from 'api/Submissions/GetOne';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/elegant.css';
import CodeMirror from '@uiw/react-codemirror';

export default function Submission() : JSX.Element {
    const [Submission, setSubmission] = useState<undefined | GetOneResults>();
    const id_from_link = new URLSearchParams(useLocation().search).get('id');

    // on mount
    useEffect(() => {
        if (id_from_link){
            const reqBody = {
                SubmissionID : id_from_link
            }
            api.Submissions.GetOne(reqBody)
                .then(res => {
                    setSubmission(res);
                    if (Submission){
                        api.Users.GetUser({ UserID: Submission.AuthorID })
                            .then(res => setSubmission({...Submission, AuthorUsername : res.Username}))
                            .catch(err => console.log(err))
                    }
                })
                .catch(err => console.log(err))
        }        
    }, [])

    if (!Submission?.AuthorUsername){
        return <CircularProgress />
    }

    console.log(Submission.results);

    return (
        <Container>
            <h1>{`${Submission.AuthorUsername}'s submission`}</h1>
            <h3>{`${Submission.Score} points`}</h3>

            <h2>Code:</h2>
            {/* <Box style={{width:'500px', height: '300px'}}>
                <CodeMirror
                    value={Submission}                    
                    options={{
                        theme: 'elegant',
                        keyMap: 'sublime',
                        mode: 'c++',
                        lineNumbers: true,
                        readOnly: true
                    }}
                />
            </Box> */}

            <h2>Fight Results:</h2>
            {Submission.results.map( (result, idx) => <ResultEntry key={idx} {...result} /> )}
        </Container>
    );
}

function ResultEntry({logs, won} : {logs : string, won : boolean}) : JSX.Element {
    return (
        <>
            {won && <h5>Battle was <span style={{color: 'green'}}>won!</span></h5>}
            {!won && <h5>Battle was <span style={{color: 'red'}}>lost!</span></h5>}
            {logs}
        </>
    );
}