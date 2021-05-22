import React, { useState, useEffect } from 'react';

import { AuthUser, getAuthStatus } from 'fetch/auth';

import { CircularProgress } from '@material-ui/core';

export default function Dashboard(): JSX.Element 
{
    const [user, setUser] = useState<AuthUser | null>(null);

    const [error, setError] = useState('');
    const [authenticated, setAuthenticated] = useState<boolean | null>(null);

    // Basically this is called only at start as it has no dependencies
    // ar trebui sa facem un fel de context in care sa tinem statusul asta de logat
    useEffect(() => {
      getAuthStatus()
        .then(responseJson => {
            if (responseJson.authenticated) {
                setAuthenticated(true)
                setUser(responseJson.user)
            }
            else {
                setAuthenticated(false)
            }
        }).catch(err => {
            setAuthenticated(false)
            setError(String(err))
        });
    }, [])
    
    return (
        <div>
          {authenticated === null ? (
            <CircularProgress />
          ) : authenticated ? (
            <div>
              <h2>Welcome, {user?.Username}!</h2>
              <div>
                <p>Social accounts connected: </p>
                {user?.Providers.facebookID && 
                  <ul>
                    <p>Facebook: {user.Providers.facebookID}</p>
                  </ul>
                }
                {user?.Providers.googleID && 
                  <ul>
                    <p>Google: {user.Providers.googleID}</p>
                  </ul>
                }
                {user?.Providers.githubID && 
                  <ul>
                    <p>Github: {user.Providers.githubID}</p>
                  </ul>
                }
              </div>
            </div>
          ) : (
            <>
              <h1>Welcome, Guest</h1>
              <p>Status: {error ? error : 'Everything is fine!'}</p>
            </>
          )}
        </div>
    )
}
