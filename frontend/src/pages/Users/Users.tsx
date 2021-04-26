import React, { useEffect, useState } from 'react';

import api, { User } from '../../api/api';
import { Grid, Container, Button, Box, TextField } from '@material-ui/core';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export default function Users(){
    const [users, setUsers] = useState([]);
    
    const [newUser, setNewUser] = useState({
        "FirstName": "",
        "LastName": "",
        "Email": "",
        "UserName": ""
    })

    useEffect(() => {
        // Can't have an async function in useEffect, so we make a workaround
        const fetchUsers = async () => {
            const userList = await api.users.getUsers();
            setUsers(userList);
        }
        fetchUsers();
    }, [])

    const handleSubmit = async (event : any) => {
        event.preventDefault()
        const lol = await api.users.addUser(newUser)
        console.log(lol)
    }

    return (
        <Container style={{border: "1px solid blue"}}>            
            <Grid container spacing={3} style={{border: "1px solid red"}}>
                {users.map((user, idx) => <Grid key={idx} item xs={3}>
                    {/* <strong>{user["_id"]}</strong> */}
                    <div>{user["FirstName"]}</div>
                    <div>{user["LastName"]}</div>
                    <div>{user["Email"]}</div>
                    <div>{user["UserName"]}</div>
                    <div>{user["TotalPoints"]}</div>
                    <div>{user["DateJoined"]}</div>
                </Grid>)}
            </Grid>
            <Box mt={5}>
                <form onSubmit={handleSubmit} >
                    <Box style={{display: "flex" }}>
                        <label>
                            First Name:
                            <TextField 
                                variant="outlined"
                                name="First Name"
                                onChange={(event) => setNewUser({...newUser, "FirstName": event.target.value})}
                            />
                        </label>
                        <label>
                            Last Name:
                            <TextField 
                                variant="outlined"
                                name="Last Name"
                                onChange={(event) => setNewUser({...newUser, "LastName": event.target.value})}
                            />
                        </label>
                        <label>
                            UserName:
                            <TextField 
                                variant="outlined"
                                name="UserName"
                                onChange={(event) => setNewUser({...newUser, "UserName": event.target.value})}
                            />
                        </label>
                        <label>
                            Email:
                            <TextField 
                                variant="outlined"
                                name="email"
                                autoComplete="email"
                                onChange={(event) => setNewUser({...newUser, "Email": event.target.value})}
                            />
                        </label>
                    </Box>
                    <Box height={10} />
                    <Button 
                        type="submit"
                        disableElevation
                        variant="contained"
                        color="primary"
                    >Submit</Button>
                </form>
                <Box height={10} />
                
            </Box>
        </Container>
    );
}
