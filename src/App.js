import React from 'react';
import './App.scss';

import SideMenu from './components/side-menu';

function App() {
  return (
    <div className="App">
      <div className="grid-container">
        <header className="header">
          Header
        </header>

        <menu className="menu">
          <SideMenu />
        </menu>

        <main className="main">
          Main
        </main>
      </div>
    </div>
  );
}

export default App;
