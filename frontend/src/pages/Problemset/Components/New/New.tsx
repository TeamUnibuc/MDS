import React, { useState, useContext } from 'react';
import api from 'api';
import { prettyJSON } from 'utils';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/elegant.css';

import { Container, Button, Box } from '@material-ui/core'
import CodeMirror from '@uiw/react-codemirror'
import { useUserStatus } from 'Contexts/UserStatus';
import classes from '*.module.css';

export default function New(): JSX.Element {
    const [GameEngine, setGameEngine] = useState('Engine code...')
    const [Name, setName] = useState('Game Title...')
    const [Description, setDescription] = useState('Game Statement...')
    const [OfficialBots, setOfficialBots] = useState<Array<string>>([])
    const {state: user} = useUserStatus();

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

        const content = await api.Games.Alter(reqBody);
        console.log(content);
    }

    return <div>
        <h1>New Game</h1>
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

        <Box>
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
        
    </div>;
}


