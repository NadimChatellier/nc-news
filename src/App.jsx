import { useState } from 'react';
import Header  from './Header';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Articles from './Articles';

import './App.css';

function App() {
  

  return (
    <Router>
        <div className="header-container">
          <Header />
          {/* <PFP /> */}
        </div>
        <Articles />

    </Router>
    
  );
}

export default App;

