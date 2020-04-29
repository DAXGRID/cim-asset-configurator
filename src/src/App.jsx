import React from 'react';
import './App.css';

const electron = window.require('electron');
const fs = electron.remote.require('fs');
const dialog = electron.remote.dialog;
const path = electron.remote.require('path');
const dirname = window.__dirname;

console.log(dirname);

const root = fs.readdirSync(dirname);
console.log(root);

function App() {
  return (
    <div className="App">
      <div className="grid-container">
        <header className="header">
          Header
          <button>Click</button>
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
