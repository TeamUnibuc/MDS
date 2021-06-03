import { GetOne as GetOneGame, GetOneResults as GetOneGameResults } from 'api/Games/GetOne';
import { useUserStatus } from 'Contexts/UserStatus';
import { Box, Button, CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/elegant.css';
import CodeMirror from '@uiw/react-codemirror';
import { NewSubmission } from 'api/Submissions/NewSubmission';


export default function View() : JSX.Element {
    const GameID = new URLSearchParams(location.search).get(`GameID`);
    const [game, setGame] = useState<undefined | GetOneGameResults>();
    const [submissionCode, setSubmissionCode] = useState("#include <bits/stdc++.h>\n\nint main() {\n    return 0;\n}\n");

    const {state: user} = useUserStatus();

    useEffect(() => {
        if (GameID)
            GetOneGame({ GameID: GameID })
                .then(g => setGame(g))
                .catch(err => console.log(err))
    }, [])

    if (!GameID) {
        return (
            <div>GameID not valid!</div>
        )
    }
    
    if (!game)
        return (<CircularProgress color="secondary"/>);
    

    const SubmitCode = () => {
        console.log("Submitted the code:");
        console.log(submissionCode);
        NewSubmission({ GameID: GameID, SubmissionCode: submissionCode })
            .then(({ SubmissionID }) => {
                if (SubmissionID)
                    console.log("Submission: " + SubmissionID);
            })
            .catch((err) => {
                console.log("Failed: " + err);
            });
    };


    return (
        <div>
            <div>
                <h1>Title: {game.game.Name}</h1>
                <p>Enunt: {game.game.Description}</p>
            </div>

            {/* If is authenticated, show submission options */}
            {user.authenticated &&
            <div style={{padding: "50px"}}>
                <Box width="90%" style={{border: "1px solid black"}}>
                    <label>
                        Your Submission:
                    </label>
                    <Box mt="20px" />
                    <Box height="300px" width="100%">
                        <CodeMirror
                            value={submissionCode}
                            onChange={(instance : CodeMirror.Editor) => setSubmissionCode(instance.getValue())}
                            options={{
                                theme: 'elegant',
                                keyMap: 'sublime',
                                mode: 'C++',
                                lineNumbers: true,
                            }}
                        />
                    </Box>
                    
                    <Box mt="20px" />
                </Box>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={SubmitCode}
                >
                    Submit
                </Button>
            </div>}
        </div>
    );
}