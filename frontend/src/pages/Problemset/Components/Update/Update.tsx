import React, { useEffect, useState } from 'react';
import { useStyles } from './UpdateStyles';
import { GetOne as GetOneGame, GetOneResults as GetOneGameResults } from 'api/Games/GetOne';
import { useUserStatus } from 'Contexts/UserStatus';
import { Box, Button, CircularProgress } from '@material-ui/core';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/elegant.css';
import CodeMirror from '@uiw/react-codemirror';
import { SourceResults, Sources } from 'api/Games/Sources';
import api from 'api';
import { TitleDivider } from 'components/TitleDivider';


export default function Update() : JSX.Element {
    const GameID = new URLSearchParams(location.search).get(`GameID`);
    const [game, setGame] = useState<undefined | GetOneGameResults>();
    const [sources, setSources] = useState<undefined | SourceResults>();
    const classes = useStyles();

    const [GameEngine, setGameEngine] = useState('')
    const [Name, setName] = useState('')
    const [Description, setDescription] = useState('')
    const [OfficialBots, setOfficialBots] = useState<Array<string>>([''])
    const {state: user} = useUserStatus();

    useEffect(() => {
        if (GameID) {
            GetOneGame({ GameID: GameID })
                .then(g => {
                    setName(g.game.Name)
                    setDescription(g.game.Description)
                    setGame(g)
                })
                .catch(err => console.log(err))
            Sources({ GameID: GameID })
                .then(s => {
                    setGameEngine(s.GameEngine)
                    const bots = s.OfficialGameBots.map(x => x.BotCode)
                    setOfficialBots(bots)
                    setSources(s)
                })
        }
    }, [])

    if (!GameID) {
        return (
            <div>GameID not valid!</div>
        )
    }
    
    if (!game || !sources)
        return (<CircularProgress color="secondary"/>);
    

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
            GameID,
            Name,
            Description,
            GameEngine,
            AuthorID: user.user.UserID,
            OfficialGameBots,
        }

        console.log(reqBody);

        const content = await api.Games.Alter(reqBody);
        console.log(content);
        window.location.href='/problemset/view?GameID='+game.game.GameID
    }

    return <Box className={classes.pageContainer}>
        <TitleDivider title='Edit Game'/>
        <h3>Game Title:</h3>
        <textarea
            style={{width: "90%"}}
            rows={1} 
            name={"Title"}
            value={Name}
            onChange={(event) => setName(event.target.value)}
        />
        
        <h3>Game Description</h3>
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
            <Box className={classes.codeMirrorContainer} height="300px">
                <CodeMirror
                    value={GameEngine}
                    onChange={(instance : CodeMirror.Editor) => setGameEngine(instance.getValue())}
                    options={{
                        theme: 'elegant',
                        keyMap: 'sublime',
                        mode: 'c++',
                        lineNumbers: true,
                        tabSize: 4,
                        smartIndent: true,
                        indentUnit: 4
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
            <Box className={classes.codeMirrorContainer} height="300px">
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
                        tabSize: 4,
                        smartIndent: true,
                        indentUnit: 4
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
            >Save</Button>
        </Box>
        
    </Box>;
}
    
