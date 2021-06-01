import { AuthUser } from 'fetch/auth'
import * as React from 'react'

/**
 * authenticated === undefined  ==>> loading / inca nu stim / trebuie facut un request sa aflam
 * 
 * authenticated === true ==>> Stim ca user-ul este logat, in user avem informatiile despre el
 * 
 * authenticated === false ==>> Stim ca user-ul nu este logat
 */
interface UserStatusState {
    authenticated?: boolean,
    user?: AuthUser,
}

interface UserStatusCtxTp {
  state: UserStatusState,
  setState: React.Dispatch<React.SetStateAction<UserStatusState>>,
}

const UserStatusCtx = React.createContext<UserStatusCtxTp>({
    state: {},
    setState: () => ({}),
})

function UserStatusProvider({children}: {children: React.ReactNode}): JSX.Element
{ 
    const [state, setState] = React.useState<UserStatusCtxTp['state']>({})
    // NOTE: you *might* need to memoize this value
    // Learn more in http://kcd.im/optimize-context
    const value = {state, setState}

    return <UserStatusCtx.Provider value={value}>
        {children}
    </UserStatusCtx.Provider>
}

function useUserStatus(): UserStatusCtxTp 
{
    const context = React.useContext(UserStatusCtx)
    
    return context
}

export {UserStatusProvider, useUserStatus}
