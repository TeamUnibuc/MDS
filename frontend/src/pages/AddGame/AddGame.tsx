import React, { useState } from 'react';

import { Container, Button, Grid } from '@material-ui/core'

function AddGame(){
    const [engine, setEngine] = useState('Engine code...')
    const [author, setAuthor] = useState('Author...')
    const [name, setName] = useState('Game Name...')
    const [description, setDescription] = useState('Game Description...')
    const [bots, setBots] = useState<Array<string>>([])

    const processSubmit = async (event : any) => {
        event.preventDefault();
        console.log("Got called");

        const reqBody = {
            name,
            description,
            engine,
            author,
            bots,
        }

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

    return <Container>
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
            name={"Name"}
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

        <textarea
            style={{width: "90%"}}
            rows={20} 
            name={"Engine"}
            value={engine}
            onChange={(event) => setEngine(event.target.value)}
        />
        {bots.map((val, id) => {
            return <textarea
                        key={id}
                        style={{width: "90%"}}
                        rows={20} 
                        name={"bot" + id}
                        value={val}
                        onChange={(event) => {
                            const new_bots = bots;
                            new_bots[id] = event.target.value;
                            setBots(new_bots);
                            setEngine(event.target.value);
                        }}
                    />
        })}

        <br />
        <Button
            onClick={() => {
                setBots([...bots, "Bot #" + (bots.length + 1) + "..."]);
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
    </Container>;
}

export default AddGame;