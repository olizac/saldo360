import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar    from './Sidebar.jsx';
import '../styles/main.css';
import './sidebar.css';

export default function Layout() {
    return (
        <div className="container">
            <Sidebar />
            <Outlet />
        </div>
    );
}
