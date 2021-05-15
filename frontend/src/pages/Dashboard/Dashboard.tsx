import React, { useState, useEffect } from 'react';
import SmartHeader from '../../components/SmartHeader';
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
    const [authenticated, setAuthenticated] = useState(false);

    // Basically this is called only at start as it has no dependencies
    useEffect(() => {
      getAuthStatus()
        .then(responseJson => {
            console.log("JSON Response")
            console.log(responseJson)
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
      <>
        <div>
          {!authenticated ? (<>
            <h1>Welcome, Guest</h1>
            <p>Status: {error}</p>
          </>) : (
            <div>
              <h2>Welcome, {user?.Username}!</h2>
            </div>
          )}
        </div>
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
    );  
}
