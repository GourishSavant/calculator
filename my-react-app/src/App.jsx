// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Component/Navbar';
import LoanCalculator from './Component/LoanCalculator';
import ExchangeRates from './Component/ExchangeRates';
import About from './Component/About';
import ErrorPage from './Component/ErrorPage';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="pl-12 w-full bg-white text-black dark:bg-gray-900 dark:text-white min-h-screen pt-24">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<LoanCalculator />} />
          <Route path="/exchange-rates" element={<ExchangeRates />} />
          <Route path="/about" element={<About />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
