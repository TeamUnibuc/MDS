import React from "react"
import { Link } from "react-router-dom";

export default function Header(props: {authenticated: boolean, handleNotAuth(): void}): JSX.Element {
    const handleLoginClick = (provider: string) => {
        // Authenticate using via passport api in the backend
        window.open(`${process.env.REACT_APP_API_URL}/${provider}/login`, '_self');

        // Failed attempt to use fetch to do the same thing.
        // const link = `${process.env.REACT_APP_API_URL}/google/login`
        // console.log("Fetching: ", link)
        // fetch(link, {
        //     method: "GET",
        //     headers:{
        //         'Content-Type': 'application/json',
        //         'Access-Control-Allow-Origin': `${process.env.REACT_APP_API_URL}`
        //     }
        // }).then(
        //     resp => resp.text()
        // ).then(
        //     resp => console.log(resp)
        // ).catch(err => console.log(err))

    };
    
    const handleRegisterClick = (provider: string) => {
        // Logout using Twitter passport api
        // Set authenticated state to false in the HomePage component
        window.open(`${process.env.REACT_APP_API_URL}/${provider}/register`, "_self");
        props.handleNotAuth();
    };

    const handleLogoutClick = () => {
        // Logout using Twitter passport api
        // Set authenticated state to false in the HomePage component
        window.open(`${process.env.REACT_APP_API_URL}/auth/logout`, "_self");
        props.handleNotAuth();
    };
    
    return <ul className="menu">
        <li>
            <Link to="/">Home</Link>
        </li>
        {props.authenticated ? (
            <li onClick={handleLogoutClick}>
                <Link to="#">Logout</Link>
            </li>
        ) : (<>
            <li onClick={() => handleLoginClick('google')}>
                <Link to="#">Google Login</Link>
            </li>
            <li onClick={() => handleRegisterClick('google')}>
                <Link to="#">Google Register</Link>
            </li>

            {/* Facebook Logins */}
            <li onClick={() => handleLoginClick('facebook')}>
                <Link to="#">Favebook Login</Link>
            </li>
            <li onClick={() => handleRegisterClick('facebook')}>
                <Link to="#">Favebook Register</Link>
            </li>
            </>
        )}
        </ul>;
}