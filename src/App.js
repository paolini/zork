import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect, startTransition } from 'react';

function Ping() {
  const [json, setJson] = useState(null);

  useEffect(() => {
    (async () => {
      const status = await fetch('/api/v0/status');
      const json = await status.json();
      setJson(json);
    })();
  })

  if (json) {
    return <p>{ json.title }</p>
  } else {
    return <p>loading...</p>
  }
}

function Game() {
  const [session, setSession] = useState(null);

  async function start() {
    console.log("start");
    setSession(1);
  }

  if (session) {

  } else {
    return <button onClick={start}>start</button>
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hello World!
        </p>
        <Ping />
        <Game />
      </header>
    </div>
  );
}

export default App;
