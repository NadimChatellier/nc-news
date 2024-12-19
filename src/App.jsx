import { useState } from 'react';
import Header from './Header';
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
      <div className="content-container" style={{ backgroundColor: '#92A1b5', color: '#EDEDED', padding: '20px' }}>
        <Articles />
      </div>
    </Router>
  );
}

export default App;


