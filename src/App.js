import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect, startTransition } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";

class Session {
  constructor(options) {
    this.on_close = options.on_close || (() => {})
    this.on_open = options.on_open || (()=> {})
    this.on_output = options.on_output || ( msg => console.log(`OUT: ${msg}`))

    let WS_URL = process.env.REACT_APP_WSURL || (
      (window.location.protocol === "https:" ? "wss://" : "ws://") 
      + window.location.hostname
      + (window.location.port ? ":" + window.location.port : ""));

  // to override the WSURL export REACT_APP_WSURL environment variable. Example:
  // export REACT_APP_WSURL="ws://localhost:8000"

    this.client = new W3CWebSocket(WS_URL);
    this.connecting = true
    this.client.onopen = () => {
      console.log(`WebSocket Client Connected ${WS_URL}`);
      this.connecting = false
      this.on_open(this);
    };

    this.client.onmessage = (message) => {
      const cmd = message.data.substr(0, 3);
      const msg = message.data.substr(4);
      if (cmd === "ERR") {
        console.log('ERR: ' + msg);
      } if (cmd === "CON") {
        this.connection_id = parseInt(msg)
        console.log('CON: ' + msg)
      } else if (cmd === "OUT") {
        console.log(`OUT: ${ msg }`);
        this.on_output(msg);
      } else if (cmd === "PLA") {
        console.log("PLA " + msg);
      } else {
        console.log("invalid message: " + message.data);
      }
    };

    this.client.onclose = (event) => {
      console.log('remote connection closed')
    };

    this.client.onerror = (event) => {
      console.log("ERROR: " + event)
      this.on_close(this)
    }
  }

  start(name) {
    this.client.send("STA " + (name || "pippo"));
  }

  close() {
    this.on_close(this)
    this.client.close()
  }
}

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
      const handle = setInterval(() => setCount(c => c+1), 1000)
      return () => {
        clearInterval(handle)
      }
  }, []);

  return (
      <p>Count: {count}</p>
  );
}

function Game() {
  const [session, setSession] = useState(null);
  const [outputs, setOutputs] = useState([]);

  useEffect(() => {
    let session = new Session({ 
      'on_open': () => {
        session.start()
      }, 
      'on_output': msg => {
        console.log(`on_output: ${msg}`)
        setOutputs(old => [...old, msg])
      } 
    })
    setSession(session);
    return () => {
      session.close();
    }
  }, [])


  if (session) {
    return <>
      { outputs.map((msg, i) => <pre key={ i }>{ msg }</pre>) }
      <br />
      <input size={ 80 } />
    </>
  } else {
    return <p>connectiong...</p>
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h4>Zork classic dungeon</h4>
      <Game />
      <Counter />
      </header>
    </div>
  );
}

export default App;
