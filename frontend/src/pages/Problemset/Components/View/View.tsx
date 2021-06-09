import { GetOne as GetOneGame, GetOneResults as GetOneGameResults } from 'api/Games/GetOne';
import { useUserStatus } from 'Contexts/UserStatus';
import { Box, Button, CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/elegant.css';
import CodeMirror from '@uiw/react-codemirror';
import { NewSubmission } from 'api/Submissions/NewSubmission';
import { Delete } from 'api/Games/Delete';


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
                window.location.href='/Submission?id='+SubmissionID;
            })
            .catch((err) => {
                console.log("Failed: " + err);
            });
    };

    const RedirectTo = (url: string) => {
        return () => window.location.href = url
    }

    const DeleteGame = () => {
        Delete({ GameID: game.game.GameID })
            .then((() => {
                window.location.href='/problemset'
            }))
            .catch(err => {
                console.log("Unable to delete game: " + err)
            })
    };


    return (
        <Box alignSelf="flex-start" width="100%">
            <Box style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <Box m={1}>
                    <Button onClick={RedirectTo("/Submissions?GameID=" + game.game.GameID)} variant="contained">View All Submissions</Button>
                </Box>
                {user.authenticated &&
                    <Box m={1}>
                        <Button onClick={RedirectTo("/Submissions?GameID=" + game.game.GameID
                                    + "&UserID=" + user.user?.UserID)} variant="contained">View My Submissions</Button>
                    </Box>
                }
                {user.authenticated && (user.user?.IsAdministrator || user.user?.UserID == game.game.AuthorID) &&
                    <>
                        <Box m={1}>
                            <Button onClick={RedirectTo("/problemset/update?GameID=" + game.game.GameID)} variant="contained">Edit</Button>
                        </Box>
                        <Box m={1}>
                            <Button onClick={DeleteGame} variant="contained" color="secondary">Delete</Button>
                        </Box>
                    </>
                }
            </Box>
            <Box>
                <h1>{game.game.Name}</h1>
                <br />
                <Box>
                    {game.game.Description.split("\n").map((i,key) => {
                        return <p key={key}>{i}</p>;
                    })}
                </Box>
            </Box>

            {/* If is authenticated, show submission options */}
            {user.authenticated &&
            <Box style={{padding: "50px"}}>
                <Box width="90%" style={{border: "1px solid black", backgroundColor: 'white'}}>
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
                    
                </Box>
                <Box mt="20px" />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={SubmitCode}
                >
                    Submit
                </Button>
            </Box>}
        </Box>
    );
}