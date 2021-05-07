import React, { useState } from 'react';
import { Redirect, useLocation } from 'react-router-dom';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function SmartRegister(): JSX.Element {
    const [redirect, setRedirect] = useState(false)
    const [extraInfo, setExtraInfo] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [error, setError] = useState('');
    const query = useQuery();

    const handleInputChanged = (event: {target: HTMLInputElement}) => {
        setNewUsername(event.target.value)
    }

    const handleSomething = () => {
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
                console.log('authenticated')
            }
            else {
                console.log('NOT authenticated')
            }
        }).catch(err => {
            console.log(err)
        });
    }
    
    const handleButtonClicked = () => {
        /// Check with a fetch that the user has been created
        const authRoute = `auth/smart-create`
        fetch(`${authRoute}?tryNewUsername=${newUsername}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(response => {
                if (response.status === 200) return response.json();
                throw new Error("failed to get create-status info from server");
            }).then(respJson => {
                if (respJson.created == true) {
                    setExtraInfo('Cont creat cu succes, redirectare in 2 secunde ...')

                    setTimeout(() => setRedirect(true), 2000)
                }
            })
            .catch(err => {
                console.log(err)
                setError(String(err))
            })
    }

    if (redirect) 
        return <Redirect to='/Dashboard' />
        
    return (
      <div>
        {error && <p>Eroare: {error}</p>}
        {extraInfo && <p>Info: {extraInfo}</p>}
        <p>Type your username to create yoour account for your email address: {query.get('email')}</p>
        <input type="text" value={newUsername} onChange={handleInputChanged}/>
        <button onClick={handleButtonClicked}>
          Submit
        </button>
        <button onClick={handleSomething}>
            Try to get auth details
        </button>
      </div>
    );  
}
