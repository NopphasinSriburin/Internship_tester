import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./index.css";
import App from "./App";
import StarPattern from "./pages/StarPattern";
import PokemonList from "./pages/PokemonList";
import ResumePage from "./pages/ResumePage";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <nav className="navbar">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/stars" className="nav-link">Star Pattern</Link>
        <Link to="/pokemon" className="nav-link">Pokemon List</Link>
        <Link to="/resume" className="nav-link">Resume</Link>
      </nav>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/stars" element={<StarPattern />} />
        <Route path="/pokemon" element={<PokemonList />} />
        <Route path="/resume" element={<ResumePage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();