import React, { useEffect, useState } from 'react'
import { Container, Divider, Box, CircularProgress } from '@material-ui/core'
import AccountDelete from './Components/AccountDelete'
import UpdateUsername from './Components/UpdateUsername'
import { Redirect, useLocation } from 'react-router-dom'
import { useUserStatus } from 'Contexts/UserStatus'
import { AuthUser } from 'fetch/auth'
import { Account } from '../../api/Account'
import ProfileShow from './Components/ProfileShow'
import UpdateName from './Components/UpdateName'

export interface EditFields {
    FirstName: string,
    LastName: string,
    Username: string,
}

const MyDivider = (): JSX.Element => {
    return <Box my={3}>
        <Divider variant="middle"/>
    </Box>
}

function Profile(): JSX.Element
{
    const location = useLocation()
    const {state: userState} = useUserStatus()
    const [profile, setProfile] = useState<AuthUser | undefined>(undefined)

    // fetch details of the user
    useEffect(() => {
        // const receivedProfile = await Account.GetByUsername({Username: queryUsername})
        const receivedProfile = {
            FirstName: "test first name",
            LastName: "some Last name",
            Email: "example mail",
            Username: "usernameeee",
            DateJoined: new Date(),
            IsAdministrator: false,
            Providers: {},
        }
        setTimeout(() => {
            setProfile(receivedProfile)
        }, 1500)
    }, [])

    if (userState.authenticated === undefined) {
        console.log('deocamndata user stare necunoscuta')
        return <Box pt={1}>
            <Container><CircularProgress color="secondary"/></Container></Box>
    }

    // figure out what you have to display from URL string
    let queryUsername = new URLSearchParams(location.search).get(`handle`)
    if (!queryUsername && userState.user && userState.authenticated)
        queryUsername = userState.user.Username
    
    console.log("auth user: ", userState.user)
    console.log("username gasit: ", queryUsername)

    const editable = (userState.authenticated && userState.user?.Username === queryUsername) ?? false
    // const editable = true
    if (!queryUsername || queryUsername.length == 0)
        return <Redirect to="/Home?warning_msg=Invalid user to view" />

    // We have to display username 'queryUsername', we can edit if 'editable'
    

    if (profile === undefined) {
        return <Box pt={1}>
        <Container><CircularProgress color="secondary"/></Container></Box>
    }

    return (
    <Box pt={1}>
    <Container>
        <ProfileShow profile={profile} />
        {editable && <>
            <MyDivider />
            <UpdateName profile={profile} />

            <MyDivider />
            <UpdateUsername profile={profile} />
      
            <MyDivider />
            <AccountDelete/>
        </>}
    </Container>
    </Box>
    )
}

export default Profile
