import React, { useEffect, useState } from 'react';

import api from '../../api/api';
import { Grid, Container } from '@material-ui/core';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export default function Bots(){
    const [bots, setBots] = useState([]);

    useEffect(() => {
        // Can't have an async function in useEffect, so we make a workaround
        const fetchBots = async () => {
            const botList = await api.bots.getBots();
            setBots(botList);
        }
        fetchBots();
    }, [])

    return (
        <Container style={{border: "1px solid red"}}>
            
            <Grid container spacing={3}>
            <Grid item xs={3}>
                <strong>empty</strong>
            </Grid>
                {bots.map((bot, idx) => <Grid key={idx} item xs={3}>
                    <strong>{bot["_id"]}</strong>
                    <div>{bot["Code"]}</div>
                    <div>{bot["CodeSubmitted"]}</div>
                    <div>{bot["AuthorId"]}</div>
                </Grid>)}
            </Grid>
        </Container>
    );
}