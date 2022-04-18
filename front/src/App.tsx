import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import './App.scss';
import { One } from './One';
import { Two } from './Two';

function App() {
  return (
   <Router>
    <div className="App">
      <div>
        <Link to={'/'}>home</Link> | <Link to={'/one'}>one</Link> | <Link to={'/two'}>two</Link>
      </div>
      <div>
        <Routes>
          <Route path='/' element={<div>@home</div>} />
          <Route path='one' element={<One />} />
          <Route path='two' element={<Two />} />
        </Routes>
      </div>
    </div>
   </Router>
  );
}

export default App;
