import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Disasters from './pages/Disasters';
import Resources from './pages/Resources';
import Social from './pages/Social';
import DisasterDetail from './pages/DisasterDetail';

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/disasters" element={<Disasters />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/social" element={<Social />} />
        <Route path="/disaster/:id" element={<DisasterDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
