import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { getAuthStatus } from '../Fetch/auth';

export default function SmartHeader(): JSX.Element
{
    const [authenticated, setAuthenticated] = useState(false)

    useEffect(() => {
        getAuthStatus()
            .then(response => {
                if (response.authenticated) {
                    setAuthenticated(true)
                }
            })
    }, [])

    const handleSmartLoginClick = (provider: string) => {
        window.open(`auth/${provider}/smart`, "_self");
    };

    const handleLogoutClick = () => {
        // Set authenticated state to false in the HomePage component
        window.open(`auth/logout`, "_self");
    };
    
    return <ul className="menu">
        <li>
            <Link to="/">Home</Link>
        </li>
        {authenticated ? (
            <li onClick={handleLogoutClick}>
                <Link to="#">Logout</Link>
            </li>
        ) : (<>
            <li onClick={() => handleSmartLoginClick('google')}>
                <Link to="#">Google Login</Link>
            </li>
            
            <li onClick={() => handleSmartLoginClick('facebook')}>
                <Link to="#">Facebook Login</Link>
            </li>
            <li onClick={() => handleSmartLoginClick('github')}>
                <Link to="#">Github Login</Link>
            </li>
            </>
        )}
    </ul>;
}