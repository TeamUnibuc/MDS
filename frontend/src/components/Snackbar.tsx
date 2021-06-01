import * as React from 'react'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom'

import { Snackbar as MUISnackbar } from '@material-ui/core'
import Slide from '@material-ui/core/Slide';
import { Alert as MUIAlert, AlertProps } from '@material-ui/lab';
import { TransitionProps } from '@material-ui/core/transitions';

interface SnackState {
    msg: string,
    severity: "error" | "warning" | "info" | "success",
    open: boolean,
    vertical: "top" | "bottom",
    horizontal: "center" | "left" | "right",
    duration: number,
}

interface SnackContextType {
  state: SnackState,
  setState: React.Dispatch<React.SetStateAction<SnackState>>,
}

const defaultState: SnackState = {
    msg: "Everything is allright!",
    severity: "info",
    open: false,
    vertical: 'top',
    horizontal: 'center',
    duration: 3000,
}

const SnackContext = React.createContext<SnackContextType>({
    state: defaultState,
    setState: () => ({}),
})

function SnackProvider({children}: {children: React.ReactNode}): JSX.Element
{ 
    const [state, setState] = React.useState(defaultState)
    // NOTE: you *might* need to memoize this value
    // Learn more in http://kcd.im/optimize-context
    const value = {state, setState}

    return <SnackContext.Provider value={value}>
        {children}
    </SnackContext.Provider>
}

function useSnackbar(): SnackContextType 
{
    const context = React.useContext(SnackContext)
    if (context === undefined) {
        throw new Error('useSnackbar must be used within a SnackProvider')
    }
    return context
}

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

export {SnackProvider, useSnackbar, Snackbar}
