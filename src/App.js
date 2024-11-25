import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Profile from './components/Profile';
// import About from './components/About';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar'; // Import Navbar if you want it on all pages

function App() {
  const server_url = "https://scrapy-wtzr.onrender.com";

  return (
    <Router>
      <div >
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Home server_url={server_url} />} />
          <Route path="/profile" element={<Profile />} />
          {/* <Route path="/about" element={<About />} /> */}
          {/* Add other routes here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
