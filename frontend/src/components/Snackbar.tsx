import * as React from 'react'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom'

import { Snackbar as MUISnackbar } from '@material-ui/core'
import { Alert as MUIAlert, AlertProps } from '@material-ui/lab';
import { SnackState, useSnackbar } from 'Contexts/Snackbar';

function Alert(props: AlertProps): JSX.Element
{
    return <MUIAlert elevation={6} variant="filled" {...props} />;
}

function Snackbar(): JSX.Element 
{
    const {state, setState} = useSnackbar()
    const location = useLocation()

    useEffect(() => {
        const severities: Array<SnackState['severity']> = ["error", "warning", "info", "success"]
        for (let i = 0; i < severities.length; ++i) {
            const sev = severities[i]
            const text = new URLSearchParams(location.search).get(`${sev}_msg`)
            if (text) {
                setState({...state, msg: text, open: true, severity: sev})
                break;
            }
        }
    }, [location])
    
    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
    
        setState({...state, open: false});
    };

    const {duration, open, msg, severity, vertical, horizontal} = state;


    return (
      <MUISnackbar 
        open={open} 
        autoHideDuration={duration} 
        onClose={handleClose}
        anchorOrigin={{ vertical, horizontal }}
        // TransitionComponent={TransitionUp}   // NU am reusit sa fac sa mearga tranzitia asta idioata
        >
        
        <Alert onClose={handleClose} severity={severity}>
            {msg}
        </Alert>
      </MUISnackbar> 
    )
}

export default Snackbar
