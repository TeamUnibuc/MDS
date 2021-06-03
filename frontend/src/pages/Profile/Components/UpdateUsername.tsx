import React, { useState } from 'react'

import { EditFields } from '../Profile'
import TextField from '@material-ui/core/TextField';
import { Box, Button, duration, makeStyles } from '@material-ui/core';
import api from 'api';
import { useSnackbar } from 'Contexts/Snackbar';
import { useUserStatus } from 'Contexts/UserStatus';
import { EditAccountResults } from 'api/Account/EditAccount';


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
    const {state: snackState, setState: setSnackState} = useSnackbar()
    const {reloadUserState} = useUserStatus()

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event)
        setUsernameVal(event.target.value ?? "")
    }

    const handleFail = (res: EditAccountResults) => {
        console.log('FAIL: ', res)
        setError(true)
        setErrorMsg(res.error_message ?? "")
    }

    const handleClick = () => {
        console.log('click save with new user: ', usernameVal)
        api.Account.EditAccount({...profile, Username: usernameVal})
        .then(res => {
            console.log('Succes: ', res)
            if (res.status === "ok") {
                setError(false)
                setErrorMsg('')
                setSnackState({...snackState, 
                    open: true, 
                    severity: "success", 
                    msg: "Username changed successfully!",
                    duration: 1200,
                })
                reloadUserState()
            }
            else {
                handleFail(res)
            }
        }).catch(res => {
            handleFail(res)
        })
    }

    console.log("Before rendering UpdateUsername: ")
    console.log(`isError: ${isError}`)

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
