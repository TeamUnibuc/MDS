import React from 'react'

import { AuthUser } from 'fetch/auth'

interface Props {
    profile: AuthUser,
}

function ProfileShow({profile}: Props): JSX.Element
{
    return (<>
    <p><strong>Email: </strong> {profile.Email} </p>
    <p><strong>First name: </strong> {profile.FirstName} </p>
    <p><strong>Last name: </strong> {profile.LastName} </p>
    <p><strong>Date joined: </strong> {profile.DateJoined.toString()} </p>
    <p><strong>Account type: </strong>{profile.IsAdministrator ? 'Admin' : 'Normal'}</p>
    </>
    )
}

export default ProfileShow
