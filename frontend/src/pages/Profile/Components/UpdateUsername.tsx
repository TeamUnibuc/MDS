import React, { useState } from 'react'

import { EditFields } from '../Profile'
import TextField from '@material-ui/core/TextField';
import { Box, Button, makeStyles } from '@material-ui/core';
import api from 'api';


interface Props {
    profile: EditFields,
}

const useStyles = makeStyles(() => ({
    saveButton: {
        backgroundColor: 'lightgreen'
    }
}))

function UpdateUsername({profile}: Props): JSX.Element
{
    const classes = useStyles()
    const [isError, setError] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")
    const [usernameVal, setUsernameVal] = useState(profile.Username)

    const onChange = (event: React.SyntheticEvent) => {
        setUsernameVal(event.currentTarget.nodeValue ?? "")
    }

    const handleClick = () => {
        api.Account.EditAccount({...profile, Username: usernameVal})
        .then(res => {
            setError(false)
            setErrorMsg('')
        }).catch(res => {
            setError(true)
            setErrorMsg(res.error_message)
        })
    }

    return <>
    <TextField 
        error={isError}
        type="string" 
        id="username-field"
        label="Username"
        helperText={errorMsg}
        defaultValue={profile.Username}
        onChange={onChange}
    />
    <Box display="inline" pt={3}>
        <Button 
            variant='contained' 
            className={classes.saveButton}
            onClick={handleClick}>
                Save
        </Button>
    </Box>
    </>
}

export default UpdateUsername
