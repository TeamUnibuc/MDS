import Header from '../../components/Header';
import React, { useState, useEffect, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';

export default function SmartRegister(): JSX.Element {
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

    const [redirect, setRedirect] = useState(false)
    const [extraInfo, setExtraInfo] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [error, setError] = useState('');
    const [authenticated, setAuthenticated] = useState(false);

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

    const handleInputChanged = (event: {target: HTMLInputElement}) => {
        setNewUsername(event.target.value)
    }
    
    const handleButtonClicked = () => {
        /// Check with a fetch that the user has been created
        const authRoute = `${process.env.REACT_APP_API_URL}/auth/smart-create`
        fetch(`${authRoute}?tryNewUsername=${newUsername}`)
            .then(response => {
                if (response.status === 200) return response.json();
                throw new Error("failed to get create-status info from server");
            }).then(respJson => {
                if (respJson.created == true) {
                    setExtraInfo('Cont creat cu succes, redirectare in 2 secunde ...')

                    setTimeout(() => setRedirect(true), 2000)
                }
            })
            .catch(err => console.log(err))
    }

    if (redirect) 
        return <Redirect to='/Dashboard' />
        
    return (
      <div>
        {error && <p>Eroare: {error}</p>}
        {extraInfo && <p>Info: {extraInfo}</p>}
        <input type="text" value={newUsername} onChange={handleInputChanged}/>
        <button onClick={handleButtonClicked}>
          Submit
        </button>
      </div>
    );  
}
