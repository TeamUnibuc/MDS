import React, { useState } from 'react'
import { EditFields } from '../Profile'
import TextField from '@material-ui/core/TextField';
import { Box, Button, makeStyles } from '@material-ui/core';
import { useSnackbar } from 'Contexts/Snackbar';
import { useUserStatus } from 'Contexts/UserStatus';
import { EditAccountResults } from 'api/Account/EditAccount';
import api from 'api';

interface Props {
    profile: EditFields,
    setProfile(fields: EditFields): void,
}

const useStyles = makeStyles(() => ({
    saveButton: {
        backgroundColor: 'lightgreen'
    }
}))


const UpdateName = ({profile, setProfile}: Props): JSX.Element => 
{
    const classes = useStyles()
    const [firstName, setFirstName] = useState(profile.FirstName)
    const [lastName, setLastName] = useState(profile.LastName)
    const {state: snackState, setState: setSnackState} = useSnackbar()
    const {reloadUserState} = useUserStatus()

    const onFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event)
        setFirstName(event.target.value ?? "")
    }

    const onLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event)
        setLastName(event.target.value ?? "")
    }

    const handleFail = (res: EditAccountResults) => {
        setSnackState({...snackState,
            open: true,
            severity: "warning",
            duration: 1500,
            msg: res.error_message ?? "Oopsie, something bad happened :(",
        })
    }

    const handleClick = () => {
        const newProfile = {
            ...profile, 
            FirstName: firstName,
            LastName: lastName,
        }
        api.Account.EditAccount(newProfile)
        .then(res => {
            if (res.status === "ok") {
                setSnackState({...snackState, 
                    open: true, 
                    severity: "success", 
                    msg: "Name changed successfully!",
                    duration: 1200,
                })
                reloadUserState()
                setProfile(newProfile)
            }
            else {
                handleFail(res)
            }
        }).catch(res => {
            handleFail(res)
        })
    }

    return <>
    <h3>Update First and Last name</h3>
    <TextField 
        type="string" 
        id="firstname-field"
        label="First Name"
        defaultValue={profile.FirstName}
        onChange={onFirstNameChange}
    />
    <TextField 
        type="string" 
        id="lastname-field"
        label="Last Name"
        defaultValue={profile.LastName}
        onChange={onLastNameChange}
    />
    <Box mt={3} pl={1}>
        <Button 
            variant='contained' 
            className={classes.saveButton}
            onClick={handleClick}>
                Save
        </Button>
    </Box>
    </>
}

export default UpdateName
