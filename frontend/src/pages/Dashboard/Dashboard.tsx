import { CircularProgress } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { getAuthStatus } from '../../Fetch/auth';

export default function Dashboard(): JSX.Element {
    const [user, setUser] = useState<{
      Username: string, 
      Email: string,
      Providers: {
        googleID?: string,
        facebookID?: string,
        twitterID?: string,
        githubID?: string, 
      }
    } | null>(null);

    const [error, setError] = useState('');
    const [authenticated, setAuthenticated] = useState<boolean | null>(null);

    // Basically this is called only at start as it has no dependencies
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
    },  [])

    return (
        <div>
          {authenticated === null ? (
            <CircularProgress />
          ) : authenticated ? (
            <div>
              <h2>Welcome, {user?.Username}!</h2>
            </div>
          ) : (
            <>
              <h1>Welcome, Guest</h1>
              <p>Status: {error}</p>
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
            </>
          )}
        </div>
    )
}
