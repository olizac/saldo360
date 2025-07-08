import React from 'react';

import { Outlet } from 'react-router-dom';
import Sidebar    from './Sidebar.jsx';
import '../styles/main.css';   // wykorzystujemy istniejące style (.container, .sidebar, .main)

export default function Layout() {
    return (
        <div className="container">
            <Sidebar />
            {/* Outlet = dynamiczna część strony */}
            <Outlet />
        </div>
    );
}
