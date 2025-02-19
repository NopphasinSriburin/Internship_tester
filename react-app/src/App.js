import React from "react";
import { Link } from "react-router-dom";

function App() {
  return (
    <div>
      <h1>Welcome to My App</h1>
      <nav>
        <ul>
          <li><Link to="/stars">Star Pattern</Link></li>
          <li><Link to="/pokemon">Pokemon List</Link></li>
          <li><Link to="/resume">Resume</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default App;
