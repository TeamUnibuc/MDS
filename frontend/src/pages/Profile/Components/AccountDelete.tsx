import React, { useState } from 'react'
import { Button } from '@material-ui/core'

import api from 'api'
import { Redirect } from 'react-router-dom'

function AccountDelete(): JSX.Element
{
    const [deleted, setDeleted] = useState(false)

    const handleClick = () => {
        api.Account.DeleteAccount({})
        .then(res => {
            console.log('Delete successful!')
            setDeleted(true)
        }).catch(res => {
            console.log('error deleting account: ', res)
        })
    }

    if (deleted) {
        return <Redirect to="/Dashboard" />
    }

    return <Button onClick={handleClick}>
        Delete this Account !!!
    </Button>
}

export default AccountDelete
