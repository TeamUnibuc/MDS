import Header from '../../components/Header';
import React, { useState, useEffect, Fragment } from 'react';

export default function Login(): JSX.Element {
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

    useEffect(() => {
        fetch("auth", {
            method: "GET",
            // credentials: "include",
            headers: {
                // Accept: "application/json",
                "Content-Type": "application/json",
                // "Access-Control-Allow-Credentials": "true"
            }
        }).then(async response => {
            if (response.status === 200) return response.json();
            throw new Error("failed to get auth status from server");
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
            console.log(err)
            setAuthenticated(false)
            setError(err)
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
