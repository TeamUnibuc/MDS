import React, { useEffect, useState } from 'react'
import { Divider, Box, CircularProgress } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import AccountDelete from './Components/AccountDelete'
import UpdateUsername from './Components/UpdateUsername'
import { Redirect, useLocation } from 'react-router-dom'
import { UserStatusState, useUserStatus } from 'Contexts/UserStatus'
import { AuthUser } from 'fetch/auth'
import api from 'api'
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

const computeUsername = (url: string, state: UserStatusState): string => 
{
    let queryUsername = new URLSearchParams(url).get(`handle`)
    console.log('compute username, state of logged: ', state)
    if (!queryUsername && state.user && state.authenticated)
        queryUsername = state.user.Username
    
    return (queryUsername ?? "")
}

const computeEditable = (state: UserStatusState, qryUsername: string) => 
{
    return (state.authenticated &&  
            state.user?.Username === qryUsername) ?? false
}

const SomethingWrong = ({children}: {children: React.ReactNode}): JSX.Element =>
{
    return <Alert severity="warning">
        <AlertTitle>Error!</AlertTitle>
        {children}
    </Alert> 
}

function Profile(): JSX.Element
{
    console.log('Rendering Profile component')

    const location = useLocation()
    /// starea daca sunt logat sau nu, sau daca inca se incarca
    const {state: userState} = useUserStatus()
    /// starea profilului incarcat pe baza queryUsername
    /// ceva != undefined, =>> ura!!
    const [profile, setProfile] = useState<AuthUser | undefined>(undefined)
    /// Daca query-ul catre Backend a returnat un user, nu a gasit, sau se incarca
    const [userFound, setUserFound] = useState<boolean | undefined>(undefined)

    const queryUsername = computeUsername(location.search, userState)
    const editable = computeEditable(userState, queryUsername)

    // fetch details of the user
    useEffect(() => {
        if (!queryUsername)
            return

        api.Users.GetByUsername({Username: queryUsername})
        .then(res => {
            console.log('setting with profile: ', res)
            if (res.status === "ok") {
                setProfile({...res, Providers: {}})
                setUserFound(true)
            }
            else {
                setUserFound(false)
            }

        })
    }, [queryUsername])

    //  queryUsername depinde de ?handle=... si de faptul daca sunt logat sau nu 
    if (userState.authenticated === undefined) {
        return <CircularProgress color="secondary"/>
    }  

    // daca am un queryUsername invalid
    if (!queryUsername || queryUsername.length == 0)
        return <SomethingWrong>
            Invalid user to view
        </SomethingWrong>
    
    // am un queryUsername valid, inca nu s-a incarcat
    if (userFound === undefined) {
        return <CircularProgress color="secondary"/>
    }  

    // User-ul nu exista
    if (userFound === false || profile === undefined) {
        return <SomethingWrong>
            User <strong>{queryUsername}</strong> doesn&apos;t seem to exist!
        </SomethingWrong>
    }

    
    // We have to display username 'queryUsername', we can edit if 'editable'
    return (<>
        <ProfileShow profile={profile} />
        {editable && <>
            <MyDivider />
            <UpdateName profile={profile} />

            <MyDivider />
            <UpdateUsername profile={profile} />
      
            <MyDivider />
            <AccountDelete/>
        </>}
    </>)
}

export default Profile
