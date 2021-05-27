import React, { useState } from 'react';
import { useStyles } from '../UserAPIStyles';
import { prettyJSON } from 'utils';
import { Container, Button, Box } from '@material-ui/core'

export default function GetUser(): JSX.Element {
    const classes = useStyles();

    const [userId, setUserId] = useState('User id...')

    const processSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        console.log("Got called");

        const reqBody = {
            user_id: userId
        }

        console.log(reqBody);

        // TO DO: implement api on front end

        // const data = await fetch('api/new_game', {
        //     method: "POST",
        //     headers:{
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(reqBody)
        // })
        // const content = await data.json()
        // console.log(content)
        // setApiResponse(prettyJSON(content));

    }

    return <Container className={classes.container}>
        <h1>Retrieve User</h1>
        <textarea
            style={{width: "90%"}}
            rows={1} 
            name={"User Id"}
            value={userId}
            onChange={(event) => setUserId(event.target.value)}
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
