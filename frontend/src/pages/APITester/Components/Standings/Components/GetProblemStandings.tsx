import React, { useState, useContext } from 'react';
import { useStyles } from '../StandingsAPIStyles';
import { prettyJSON } from 'utils';
import api from 'api';
import { ApiTesterContext } from '../../../ApiTesterContext'

import { Container, Button, Box, TextField, MenuItem } from '@material-ui/core'

export default function GetProblemStandings(): JSX.Element {
    const classes = useStyles();
    const { setApiResponse } = useContext(ApiTesterContext)

    const [reqEntries, setReqEntries] = useState(10);
    const [reqOffset, setReqOffset] = useState(0);
    const [GameID, setGameID] = useState('Game id...')
    const [orderBy, setOrderBy] = useState('score');
    const [resultOrder, setResultOrder] = useState('decreasing');
    
    const order_bys = ['score', 'submissions'];
    const result_orders = ['increasing', 'decreasing'];

    const processSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        console.log("Got called");

        const reqBody = {
            requested_entries: reqEntries,
            requested_offset: reqOffset,
            order_by: orderBy,
            result_order: resultOrder,
            GameID
        }

        console.log(reqBody);

        // Example of how it should work, not fully working

        const content = await api.Standings.GameStandings(reqBody);
        console.log(content);
        setApiResponse(prettyJSON(content));
        // setApiResponse('{Lol}')
    }

    return <Container className={classes.container}>
        <h1>Get Problem Standings</h1>

        <TextField
            label="Requested Entries"
            type="number"
            value={reqEntries}
            onChange={(event) => setReqEntries(Number(event.target.value))}
            InputLabelProps={{
                shrink: true,
            }}
            inputProps={{
                min: 0,
                step: 1
            }}
            helperText="Number of requested standings entries"
        />

        <Box mt="20px" />

        <TextField
            label="Requested Offset"
            type="number"
            value={reqOffset}
            onChange={(event) => setReqOffset(Number(event.target.value))}
            InputLabelProps={{
                shrink: true,
            }}
            inputProps={{
                min: 0,
                step: 1
            }}
            helperText="Number of standing entries to skip (for pagination)"
        />

        <Box mt="20px" />

        <TextField 
            label="Game Id"
            value={GameID}
            onChange={(event) => setGameID(event.target.value)}
            helperText="id of the game we want to get standings to"
        />


        <Box mt="20px" />

        <TextField 
            select
            value={orderBy}
            onChange={(event) => setOrderBy(event.target.value)}
            helperText="Criteria to sort by"
        >
            {order_bys.map((option) => (
            <MenuItem key={option} value={option}>
                {option}
            </MenuItem>
            ))}
        </TextField>

        <Box mt="20px" />

        <TextField 
            select
            value={resultOrder}
            onChange={(event) => setResultOrder(event.target.value)}
            helperText="Result order"
        >
            {result_orders.map((option) => (
            <MenuItem key={option} value={option}>
                {option}
            </MenuItem>
            ))}
        </TextField>

        <Box mt="20px" />

        <Box className={classes.buttonContainer}>
            <Button 
                onClick={processSubmit}
                variant="contained"
                color="primary"
            >Get Problem Standings</Button>
        </Box>
        
    </Container>;
}
