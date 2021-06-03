import React, { useState, useContext } from 'react';
import { ApiTesterContext } from '../../../ApiTesterContext';
import { useStyles } from '../UserAPIStyles';
import { prettyJSON } from 'utils';
import api from 'api';
import { Container, Button, Box } from '@material-ui/core'

export default function GetUser(): JSX.Element {
    const classes = useStyles();
    const { setApiResponse } = useContext(ApiTesterContext);

    const [UserID, setUserID] = useState('User id...')

    const processSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        console.log("Got called");

        const reqBody = {
            UserID
        }

        console.log(reqBody);

        // TO DO: implement api on front end

        // const data = await fetch('/api/new_game', {
        //     method: "POST",
        //     headers:{
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(reqBody)
        // })
        // const content = await data.json()
        
        const content = await api.Users.GetUser(reqBody)
        console.log(content)
        setApiResponse(prettyJSON(content));
        // setApiResponse('{Users}');
    }

    return <Container className={classes.container}>
        <h1>Retrieve User</h1>
        <textarea
            style={{width: "90%"}}
            rows={1} 
            name={"User Id"}
            value={UserID}
            onChange={(event) => setUserID(event.target.value)}
        />


        <Box mt="20px" />

        <Box className={classes.buttonContainer}>
            <Button 
                onClick={processSubmit}
                variant="contained"
                color="primary"
            >Retrieve User</Button>
        </Box>
        
    </Container>;
}
