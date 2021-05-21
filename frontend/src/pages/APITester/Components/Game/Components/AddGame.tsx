import React, { useState } from 'react';
import { useStyles } from '../GameAPIStyles';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/elegant.css';

import { Container, Button, Box } from '@material-ui/core'
import CodeMirror from '@uiw/react-codemirror'

function AddGame(): JSX.Element {
    const classes = useStyles();

    const [engine, setEngine] = useState('Engine code...')
    const [author, setAuthor] = useState('Author id...')
    const [name, setName] = useState('Game Title...')
    const [description, setDescription] = useState('Game Statement...')
    const [gameId, setGameId] = useState('Set Game Id ...')
    const [bots, setBots] = useState<Array<string>>([])

    const processSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        console.log("Got called");

        const reqBody = {
            name,
            description,
            engine,
            author,
            bots,
        }

        console.log(reqBody);

        const data = await fetch('api/new_game', {
            method: "POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqBody)
        })
        const content = await data.json()
        console.log(content)
    }

    return <Container className={classes.container}>
        <h1>New Game</h1>
        <textarea
            style={{width: "90%"}}
            rows={1} 
            name={"Author"}
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
        />

        <textarea
            style={{width: "90%"}}
            rows={1} 
            name={"Game"}
            value={gameId}
            onChange={(event) => setGameId(event.target.value)}
        />

        <textarea
            style={{width: "90%"}}
            rows={1} 
            name={"Title"}
            value={name}
            onChange={(event) => setName(event.target.value)}
        />
        
        <textarea
            style={{width: "90%"}}
            rows={20} 
            name={"Description"}
            value={description}
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
                    value={engine}
                    onChange={(instance : CodeMirror.Editor) => setEngine(instance.getValue())}
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
        {bots.map((val, id) => <Box key={id} style={{width: "90%"}}>
            <label>
                {`Bot #${id} code`}
            </label>
            <Box mt="20px" />
            <Box style={{width: "100%", height: "300px"}}>
                <CodeMirror
                    value={val}
                    onChange={(instance : CodeMirror.Editor) => {
                        const new_bots = bots;
                        new_bots[id] = instance.getValue();
                        setBots(new_bots);
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
                    setBots([...bots, "Bot #" + (bots.length + 1) + " code..."]);
                }}
                variant="contained"
                color="primary">
                New Bot
            </Button>
            <Button
                onClick={() => {
                    setBots(bots.slice(0, bots.length - 2));
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