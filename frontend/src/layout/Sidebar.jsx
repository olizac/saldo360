import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    CreditCard,
    Wallet,
    Settings as SettingsIcon,
    LogOut,                       // ⬅️ nowa ikona
} from 'lucide-react';

const USER_NAME = 'Oliwia Z';
const getInitials = (n) => n.trim().split(/\s+/).slice(0, 2).map(w => w[0].toUpperCase()).join('');

export default function Sidebar() {
    const location = useLocation();
    const initials = getInitials(USER_NAME);

    /* zastąp poniżej faktyczną logiką log-out */
    const handleLogout = () => alert('Wylogowano!');

    return (
        <aside className="sidebar">
            <h1 className="logo">
                <span className="light">saldo</span><strong>360</strong>
            </h1>

            <div className="avatar" title={USER_NAME}>{initials}</div>
            <h2 className="name">{USER_NAME}</h2>

            <nav className="nav-wrapper">
                <ul className="nav">
                    <li className={location.pathname === '/start' ? 'active' : ''}>
                        <NavLink to="/start"><LayoutDashboard size={20}/> Start</NavLink>
                    </li>
                    <li className={location.pathname === '/transakcje' ? 'active' : ''}>
                        <NavLink to="/transakcje"><CreditCard size={20}/> Transakcje</NavLink>
                    </li>
                    <li className={location.pathname === '/budzet' ? 'active' : ''}>
                        <NavLink to="/budzet"><Wallet size={20}/> Budżet</NavLink>
                    </li>
                    <li className={location.pathname === '/ustawienia' ? 'active' : ''}>
                        <NavLink to="/ustawienia"><SettingsIcon size={20}/> Ustawienia</NavLink>
                    </li>

                </ul>

                {/* ───── nowy przycisk Wyloguj ───── */}
                <div className="logout-separator"/>
                <button className="logout-btn" onClick={handleLogout}>
                    <LogOut size={20}/> Wyloguj
                </button>

            </nav>
        </aside>
    );
}
