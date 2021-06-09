import * as React from 'react'
export interface SnackState {
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

export {SnackProvider, useSnackbar}
