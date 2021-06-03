import React from 'react'
import { Alert, AlertTitle } from '@material-ui/lab'
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
