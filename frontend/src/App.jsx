import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout     from './layout/Layout.jsx';
import HomePage      from './pages/HomePage.jsx';        // wcześniej „HomePage”
import Budget     from './pages/Budget.jsx';
import Settings   from './pages/Settings.jsx';     // kolorystyka z poprzedniej odpowiedzi
import History    from './pages/History.jsx';      // „Transakcje”

export default function App() {
    return (
        <Router>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/"           element={<Navigate to="/start" replace />} />
                    <Route path="/start"      element={<HomePage />} />
                    <Route path="/transakcje" element={<History />} />
                    <Route path="/budzet"     element={<Budget />} />
                    <Route path="/ustawienia" element={<Settings />} />
                </Route>

                {/* 404 */}
                <Route path="*" element={<div style={{padding:'3rem',textAlign:'center'}}>404 – Nie znaleziono strony</div>} />
            </Routes>
        </Router>
    );
}
