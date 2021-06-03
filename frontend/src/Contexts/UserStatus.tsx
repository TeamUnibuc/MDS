import { AuthUser, getAuthStatus } from 'fetch/auth'
import * as React from 'react'

/**
 * authenticated === undefined  ==>> loading / inca nu stim / trebuie facut un request sa aflam
 * 
 * authenticated === true ==>> Stim ca user-ul este logat, in user avem informatiile despre el
 * 
 * authenticated === false ==>> Stim ca user-ul nu este logat
 */
export interface UserStatusState {
    authenticated?: boolean,
    user?: AuthUser,
}

interface UserStatusCtxTp {
  state: UserStatusState,
  setState: React.Dispatch<React.SetStateAction<UserStatusState>>,
  reloadUserState: () => Promise<void>,
}

const UserStatusCtx = React.createContext<UserStatusCtxTp>({
    state: {},
    setState: () => ({}),
    reloadUserState: async () => {console.log('this function shouldnt be called')}
})

function UserStatusProvider({children}: {children: React.ReactNode}): JSX.Element
{ 
    const [state, setState] = React.useState<UserStatusCtxTp['state']>({})
    // NOTE: you *might* need to memoize this value
    // Learn more in http://kcd.im/optimize-context
    
    const reloadUserState = async () =>
    {
        try {
            const resp = await getAuthStatus()
            if (resp.authenticated === true) {
                setState({authenticated: true, user: resp.user})
            }
            else {
                setState({authenticated: false, user: undefined})
            }
        }
        catch {
            setState({authenticated: false, user: undefined})
        }
    }
    
    const value = {state, setState, reloadUserState}

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
