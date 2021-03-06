import React from 'react'
import { Link } from 'react-router-dom';

interface HeaderProps {
    authenticated: boolean,
    handleNotAuth(): void,
}

export default function SmartHeader({authenticated, handleNotAuth}: HeaderProps): JSX.Element
{
    const handleSmartLoginClick = (provider: string) => {
        window.open(`auth/${provider}/smart`, "_self");
    };

    const handleLogoutClick = () => {
        // Set authenticated state to false in the HomePage component
        window.open(`auth/logout`, "_self");
        handleNotAuth();
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