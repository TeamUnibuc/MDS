import React from 'react'
import { Link } from 'react-router-dom';

interface HeaderProps {
    authenticated: boolean,
    handleNotAuth(): void,
}

export default function Header({authenticated, handleNotAuth}: HeaderProps): JSX.Element
{
    const handleSmartLoginClick = (provider: string) => {
        window.open(`${process.env.REACT_APP_API_URL}/${provider}/register`, "_self");
    };

    const handleLogoutClick = () => {
        // Set authenticated state to false in the HomePage component
        window.open(`${process.env.REACT_APP_API_URL}/auth/logout`, "_self");
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
            </>
        )}
    </ul>;
}