import { Container, Divider, Box } from '@material-ui/core'
import React, { useState } from 'react'
import AccountDelete from './Components/AccountDelete'
import UpdateUsername from './Components/UpdateUsername'

function Profile(): JSX.Element
{
    return (
    <Box pt={1}>
    <Container>
        <UpdateUsername></UpdateUsername>
        <Box my={3}>
            <Divider variant="middle"/>
        </Box>
        <AccountDelete></AccountDelete>
    </Container>
    </Box>
    )
}

export default Profile
