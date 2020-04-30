import React from 'react';
import './App.css';

const electron = window.require('electron');
const fs = electron.remote.require('fs');

const root = fs.readFileSync('./../asset-schema.json', 'UTF8');

function App() {
  return (
    <div className="App">
      <div className="grid-container">
        <header className="header">
          Header
        </header>

        <menu className="menu">
          Menu
        </menu>

        <main className="main">
          Main
        </main>
      </div>
    </div>
  );
}

export default App;
