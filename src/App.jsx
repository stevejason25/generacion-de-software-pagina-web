import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CmsProvider } from './context/CmsContext';
import Home from './pages/public/Home';
import Admin from './pages/admin/Admin';
import './styles/main.css';

function App() {
  return (
    <CmsProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </CmsProvider>
  );
}

export default App; // <-- ¡ESTA LÍNEA ES VITAL!