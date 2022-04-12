import React from 'react';
import { Counter } from './features/counter/Counter';
import './App.css';
import { Logo } from './features/logo/Logo';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Logo />
        <Counter />
      </header>
    </div>
  );
}

export default App;
