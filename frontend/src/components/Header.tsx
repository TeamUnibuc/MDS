import React, { useState } from "react"
import { Link } from "react-router-dom";

export default function Header(): JSX.Element {
    const [authenticated, setAuthenticated] = useState(false)

    const _handleSignInClick = () => {
        // Authenticate using via passport api in the backend
        // Open Twitter login page
        window.open('http://localhost:7777/auth/google', '_self');
    };
    
    const _handleLogoutClick = () => {
        // Logout using Twitter passport api
        // Set authenticated state to false in the HomePage component
        window.open("http://localhost:7777/auth/logout", "_self");
        _handleNotAuthenticated();
    };

    const _handleNotAuthenticated = () => {
        setAuthenticated(false)
    };
    
    return <ul className="menu">
        <li>
            <Link to="/">Home</Link>
        </li>
        {authenticated ? (
            <li onClick={_handleLogoutClick}>Logout</li>
        ) : (
            <li onClick={_handleSignInClick}>Login</li>
        )}
        </ul>;
}