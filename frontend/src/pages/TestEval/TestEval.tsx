import React, { useState } from 'react';

import { Container, Button, Grid } from '@material-ui/core'

function TestEval(){

    const [inject, setInject] = useState('')
    const [engine, setEngine] = useState('')
    const [bot1, setBot1] = useState('')
    const [bot2, setBot2] = useState('')

    const processSubmit = async (event : any) => {
        event.preventDefault();
        console.log("Got called");
        console.log(inject);
        console.log(engine);
        console.log(bot1);
        console.log(bot2);

        const reqBody = {
            engine,
            injects: [inject],
            bots: [bot1, bot2]
        }

        const data = await fetch('api/fight', {
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
        <form onSubmit={processSubmit}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}> 
                <label>
                    Engine:
                    <br />
                    <textarea 
                        style={{width: "90%"}}
                        rows={20} 
                        name="engine"
                        value={engine}
                        onChange={(event) => setEngine(event.target.value)}
                    />    
                </label>
                </Grid>
                <Grid item xs={12} md={6}> 
                <label>
                    Inject:
                    <br />
                    <textarea
                        style={{width: "90%"}}
                        rows={20}
                        name="inject"
                        value={inject}
                        onChange={(event) => setInject(event.target.value)}
                    />    
                </label>
                </Grid>
                <Grid item xs={12} md={6}> 
                <label>
                    Bot 1:
                    <br />
                    <textarea
                        style={{width: "90%"}}
                        rows={20}
                        name="bot1"
                        value={bot1}
                        onChange={(event) => setBot1(event.target.value)}
                    />
                </label>
                </Grid>
                <Grid item xs={12} md={6}> 
                <label>
                    Bot 2:
                    <br />
                    <textarea 
                        style={{width: "90%"}}
                        rows={20}
                        name="bot2"
                        value={bot2}
                        onChange={(event) => setBot2(event.target.value)}
                    />    
                </label>
                </Grid>
            </Grid>
            <Button 
                type="submit"
                disableElevation
                variant="contained"
                color="primary"
            >Submit</Button>
        </form>
    </Container>;
}

export default TestEval;