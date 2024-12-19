import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Header from './Header';
import Articles from './Articles';
import Taskbar from './Taskbar';
import SortDropdown from './SortDropDown';

import './App.css';

function App() {
  return (
    <Router>
      <div className="header-container">
        <Header />
      </div>
      <Taskbar />
      <div
        className="content-container"
        style={{
          backgroundColor: '#92A1b5',
          color: '#EDEDED',
          padding: '20px',
        }}
      >
        <Routes>
          {/* Default route for all articles */}
          <Route path="/articles" element={<Articles />} />
          {/* Dynamic route for filtered articles by topic */}
          <Route path="/articles/:slug" element={<Articles />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;



