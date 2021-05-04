import Header from '../../components/Header';
import React, { useState, useEffect, Fragment } from 'react';

export default function Dashboard(): JSX.Element {
    const [user, setUser] = useState<{
      Username: string, 
      Email: string,
      Providers: {
        googleID: string,
        facebookID: string,
        twitterID: string,
        githubID: string,
      }
    } | null>(null);

    const [error, setError] = useState('');
    const [authenticated, setAuthenticated] = useState(false);

    const handleNotAuthenticated = () => {
        setAuthenticated(false)
    };

    // Basically this is called only at start as it has no dependencies
    useEffect(() => {
        fetch("auth", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }).then(async response => {
            if (response.status === 200) return response.json();
            throw new Error("failed to get auth status from server, http code: " + response.status);
        }).then(responseJson => {
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
      <div>
        <Header
          authenticated={authenticated}
          handleNotAuth={handleNotAuthenticated}
        />
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
        </div>
      </div>
    );  
}
