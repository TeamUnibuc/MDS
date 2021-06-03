import { Alert, AlertTitle } from '@material-ui/lab'
import { AuthUser } from 'fetch/auth'
import React from 'react'
import { EditFields } from '../Profile'

interface Props {
    profile: EditFields,
}

const UpdateName = ({profile}: Props): JSX.Element => 
{
    return <Alert severity="error">
        <AlertTitle>Error!</AlertTitle>
        Updating names not implemented!
    </Alert>
}

export default UpdateName
