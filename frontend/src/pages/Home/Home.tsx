import React, { useEffect, useState } from 'react';

import { Box, Divider, Typography } from '@material-ui/core';
import { useUserStatus } from 'Contexts/UserStatus';
import api from 'api';
import TotalPoints from './components/TotalPoints';
import LatestGames from './components/LatestGames';

const Greeting = (): JSX.Element => 
{
    const {state: {user, authenticated}} = useUserStatus()

    if (!(authenticated && user))
        return <></>

    return <Typography variant="h4" component="h3">
        Welcome, {user.FirstName} !
    </Typography>
}

export default function Home(): JSX.Element 
{
    const {state: {user, authenticated}} = useUserStatus()

    const [summaryPoints, setSumamryPoints] = useState<number | undefined>(undefined)

    useEffect(() => {
        if (!user)
            return 
        // Retrieve data about total points
        api.Standings.UserGlobalStandings({UserID: user.UserID})
        .then(res => {
            setSumamryPoints(res.TotalPoints)
        })
        .catch(err => {
            console.log('Retrievving total points error: ', err)
        })
    }, [user])

    return <>
    <Typography variant="h2" component="h3">
        Home
    </Typography>
    
    <Box my={2}>
        <Divider />
    </Box>

    <Box 
      display="flex" 
      justifyContent="space-between" 
      flexDirection="row">
        <Greeting />
        {authenticated && user && summaryPoints !== undefined && 
            <TotalPoints username={user.Username} points={summaryPoints} />
        }
    </Box>

    <Box my={3}>
        <Divider />
    </Box>

    <LatestGames />
    </>
}

// TODO: Arhiva
// TODO: Profil

// TODO: Lista Cele mai noi probleme adaugate