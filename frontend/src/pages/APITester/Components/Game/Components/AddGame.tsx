import React, { useState, useContext } from 'react';
import api from 'api';
import { useStyles } from '../GameAPIStyles';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/elegant.css';
import { ApiTesterContext } from '../../../ApiTesterContext'

import { Container, Button, Box } from '@material-ui/core'
import CodeMirror from '@uiw/react-codemirror'

function AddGame(): JSX.Element {
    const classes = useStyles();
    const { setApiResponse } = useContext(ApiTesterContext);

    const [GameEngine, setGameEngine] = useState('Engine code...')
    const [AuthorID, setAuthorID] = useState('Author id...')
    const [Name, setName] = useState('Game Title...')
    const [Description, setDescription] = useState('Game Statement...')
    const [GameID, setGameID] = useState('Set Game Id ...')
    const [OfficialBots, setOfficialBots] = useState<Array<string>>([])

    const processSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        console.log("Got called");

        const OfficialGameBots = OfficialBots.map((it, idx) => ({
            BotName: `Bot#${idx}`,
            BotCode: it
        }))

        const reqBody = {
            Name,
            Description,
            GameEngine,
            AuthorID,
            OfficialGameBots
        }

        console.log(reqBody);

        // const content = await api.Games.Alter(reqBody);
        // console.log(content);
        // setApiResponse(JSON.stringify(content, undefined, 2));
        setApiResponse('{Lol}');
    }

    return <Container className={classes.container}>
        <h1>New Game</h1>
        <textarea
            style={{width: "90%"}}
            rows={1} 
            name={"Author"}
            value={AuthorID}
            onChange={(event) => setAuthorID(event.target.value)}
        />

        <textarea
            style={{width: "90%"}}
            rows={1} 
            name={"Game"}
            value={GameID}
            onChange={(event) => setGameID(event.target.value)}
        />

        <textarea
            style={{width: "90%"}}
            rows={1} 
            name={"Title"}
            value={Name}
            onChange={(event) => setName(event.target.value)}
        />
        
        <textarea
            style={{width: "90%"}}
            rows={20} 
            name={"Description"}
            value={Description}
            onChange={(event) => setDescription(event.target.value)}
        />

        <br/>

        <Box width="90%">
            <label>
                Engine code:
            </label>
            <Box mt="20px" />
            <Box height="300px" width="100%">
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
            <label>
                {`Bot #${id} code`}
            </label>
            <Box mt="20px" />
            <Box style={{width: "100%", height: "300px"}}>
                <CodeMirror
                    value={val}
                    onChange={(instance : CodeMirror.Editor) => {
                        const new_bots = OfficialBots;
                        new_bots[id] = instance.getValue();
                        setOfficialBots(new_bots);
                    }}
                />
            </Box>
            
            <Box mt="20px" />
        </Box>
                
        )}

        <Box mt="40px" />

        <Box className={classes.buttonContainer}>
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
                    setOfficialBots(OfficialBots.slice(0, OfficialBots.length - 2));
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
        
    </Container>;
}

export default AddGame;