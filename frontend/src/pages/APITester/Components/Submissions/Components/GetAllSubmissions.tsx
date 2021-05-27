import React, { useState, useContext } from 'react';
import { useStyles } from '../SubmissionsAPIStyles';
import api from 'api';
import { ApiTesterContext } from '../../../ApiTesterContext';

import { Container, Button, Box, TextField, MenuItem } from '@material-ui/core'

export default function GetAllSubmissions(): JSX.Element {
    const classes = useStyles();
    const { setApiResponse } = useContext(ApiTesterContext);

    const [reqSubmissions, setReqSubmissions] = useState(10);
    const [reqOffset, setReqOffset] = useState(0);
    const [orderBy, setOrderBy] = useState('date');
    const [resultOrder, setResultOrder] = useState('decreasing');
    const [GameID, setGameID] = useState('Game id...')
    const [UserID, setUserID] = useState('User id...')

    const order_bys = ['date', 'score'];
    const result_orders = ['increasing', 'decreasing'];

    const processSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        console.log("Got called");

        const reqBody = {
            requested_submissions: reqSubmissions,
            requested_offset: reqOffset,
            order_by: orderBy,
            result_order: resultOrder,
            GameID,
            UserID
        }

        console.log(reqBody);

        // Example of how it should work, not fully working

        // const content = await api.Submissions.GetAll(regBody);
        // console.log(content);
        // setApiResponse(JSON.stringify(content, undefined 2));
        setApiResponse('{Lol}')
    }

    return <Container className={classes.container}>
        <h1>Get All Submissions</h1>

        <TextField
            label="Requested Submissions"
            type="number"
            value={reqSubmissions}
            onChange={(event) => setReqSubmissions(Number(event.target.value))}
            InputLabelProps={{
                shrink: true,
            }}
            inputProps={{
                min: 0,
                step: 1
            }}
            helperText="Number of requested submissions"
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
            helperText="Number of submissions to skip (for pagination)"
        />

        <Box mt="20px" />

        <TextField 
            label="Game Id"
            value={GameID}
            onChange={(event) => setGameID(event.target.value)}
            helperText="If exists, the submissions have to be made to this game"
        />

        <Box mt="20px" />

        <TextField 
            label="User Id"
            value={UserID}
            onChange={(event) => setUserID(event.target.value)}
            helperText="If exists, the submissions have to be made by the user"
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
            >Get All Submissions</Button>
        </Box>
        
    </Container>;
}
