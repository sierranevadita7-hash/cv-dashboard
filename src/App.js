import React from 'react';
import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  return (
    <div className="App">
      <LanguageProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </HashRouter>
      </LanguageProvider>
    </div>
  );
}

export default App;
