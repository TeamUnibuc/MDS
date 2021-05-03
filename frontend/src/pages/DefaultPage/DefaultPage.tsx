import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './DefaultPage.css';

export default function DefaultPage(): JSX.Element{
  const [msg, setMsg] = useState('')
  
  // on mount basically
  // the function in useEffect cannot be async, so we trick it
  useEffect(() => {
    const func = async () => {
      const my_req = await fetch('/api', {
        method: 'GET',headers: {'Content-Type': 'application/json'},
      })

      const resp = await my_req.json()
      setMsg(resp["OK"])
    }
    func();
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <strong>
          {msg}
        </strong>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          learn react
        </a>
      </header>
    </div>
  );
}