import React, { useState } from 'react'
import { Button, makeStyles } from '@material-ui/core'

import api from 'api'
import { Redirect } from 'react-router-dom'
import { useSnackbar } from 'components/Snackbar'
import { useUserStatus } from 'Contexts/UserStatus'

const useStyles = makeStyles(() => ({
    buttonDelete: {
        backgroundColor: '#ffebeb',
        color: 'red',
    }
}));

function AccountDelete(): JSX.Element
{
    const classes = useStyles()
    const [deleted, setDeleted] = useState(false)
    const {state: snackState, setState: setSnack} = useSnackbar()
    const {reloadUserState} = useUserStatus()

    const handleClick = () => {
        api.Account.DeleteAccount({})
        .then(res => {
            if (res.status === "ok") {
                console.log('Delete successful!')
                reloadUserState()
                setDeleted(true)
            }
            else {
                console.log('Delete unsuccessful: ', res)
                setSnack({...snackState, 
                    open: true, 
                    msg: res.error_message || "", 
                    severity: 'info'})
            }
        }).catch(res => {
            console.log('error deleting account: ', res)
            setSnack({...snackState,
                open: true, 
                msg: res.error_message, 
                severity: 'info'})
        })
    }

    if (deleted) {
        return <Redirect to="/Dashboard?info_msg=Account deleted" />
    }

    return <Button className={classes.buttonDelete} onClick={handleClick} variant="contained">
        Delete this Account !!!
    </Button>
}

export default AccountDelete
