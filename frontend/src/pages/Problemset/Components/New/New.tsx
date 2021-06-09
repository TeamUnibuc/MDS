import React, { useState } from 'react';
import { useStyles } from './NewStyles'; 
import api from 'api';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/elegant.css';

import { Button, Box } from '@material-ui/core'
import CodeMirror from '@uiw/react-codemirror'
import { useUserStatus } from 'Contexts/UserStatus';

export default function New(): JSX.Element {
    const [GameEngine, setGameEngine] = useState('Engine code...')
    const [Name, setName] = useState('Game Title...')
    const [Description, setDescription] = useState('Game Statement...')
    const [OfficialBots, setOfficialBots] = useState<Array<string>>(["Bot #0 code..."])
    const {state: user} = useUserStatus();
    const classes = useStyles();

    const processSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        console.log("Got called");

        const OfficialGameBots = OfficialBots.map((it, idx) => ({
            BotName: `Bot#${idx}`,
            BotCode: it
        }))

        if (!user.user) {
            console.log("Unable to create problem: not authenticated!");
            return;
        }
        
        // TODO: add gameid
        const reqBody = {
            Name,
            Description,
            GameEngine,
            AuthorID: user.user.UserID,
            OfficialGameBots,
        }

        console.log(reqBody);

        api.Games.Alter(reqBody)
            .then(content => {
                console.log(content)
                if (content.GameID)
                    window.location.href='/problemset/view?GameID='+content.GameID
            })
    }

    return (<Box className={classes.pageContainer}>
        <h1>New Game</h1>
        <h3>Game Title:</h3>
        <textarea
            style={{width: "90%"}}
            rows={1} 
            name={"Title"}
            value={Name}
            onChange={(event) => setName(event.target.value)}
        />
        
        <h3>Game Statement:</h3>
        <textarea
            style={{width: "90%"}}
            rows={20} 
            name={"Description"}
            value={Description}
            onChange={(event) => setDescription(event.target.value)}
        />

        <br/>

        <Box width="90%">
            <h3>
                Engine code:
            </h3>
            <Box mt="20px" />
            <Box height="300px" className={classes.codeMirrorContainer}>
                <CodeMirror
                    value={GameEngine}
                    onChange={(instance : CodeMirror.Editor) => setGameEngine(instance.getValue())}
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
        {OfficialBots.map((val, id) => <Box key={id} style={{width: "90%"}}>
            <h3>
                {`Bot #${id}`}
            </h3>
            <Box mt="20px" />
            <Box height="300px" className={classes.codeMirrorContainer}>
                <CodeMirror
                    value={val}
                    onChange={(instance : CodeMirror.Editor) => {
                        const new_bots = OfficialBots;
                        new_bots[id] = instance.getValue();
                        setOfficialBots(new_bots);
                    }}
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
                
        )}

        <Box mt="40px" />

        <Box className={classes.buttonsContainer}>
            <Button
                onClick={() => {
                    setOfficialBots([...OfficialBots, "Bot #" + (OfficialBots.length + 1) + " code..."]);
                }}
                variant="contained"
                color="primary">
                New Bot
            </Button>
            <Button
                onClick={() => {
                    if (OfficialBots.length >= 2)
                        setOfficialBots(OfficialBots.slice(0, OfficialBots.length - 1));
                }}
                variant="contained"
                color="primary">
                Delete Last Bot
            </Button>
            <Button 
                onClick={processSubmit}
                variant="contained"
                color="primary"
            >Submit</Button>
        </Box>
        
    </Box>
    );
}


