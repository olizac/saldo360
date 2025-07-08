import React, { useState, useEffect } from 'react';
import { THEMES,LIGHT_THEMES, DARK_THEMES }             from '../styles/Themes';
import { CHART_PALETTES }     from '../styles/ChartPalettes';
import { getPalettePreview }  from '../utils/getPalettePreview';

import '../styles/homepage.css';
import '../styles/settings.css';

export default function Settings() {
    const [themeKey, setThemeKey]        = useState('teal');
    const [chartKey, setChartKey]        = useState('default');
    const [darkMode, setDarkMode]        = useState(
        () => localStorage.getItem('dark') === '1'
    );

    useEffect(() => {
        const { main, dark, light } = THEMES[themeKey];
        const root = document.documentElement;
        root.style.setProperty('--teal-main',  main);
        root.style.setProperty('--teal-dark',  dark);
        root.style.setProperty('--teal-light', light);
    }, [themeKey]);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', darkMode);
        localStorage.setItem('dark', darkMode ? '1' : '0');
    }, [darkMode]);

    const renderThemeGrid = (keys) => (
        <div className="settings-grid">
            {keys.map(k => (
                <button
                    key={k}
                    className={`swatch-lg ${k === themeKey ? 'active' : ''}`}
                    style={{ background: THEMES[k].dark }}
                    onClick={() => setThemeKey(k)}
                    title={k}
                />
            ))}
        </div>
    );

    return (
        <div className="container">
            <main className="settings-main">
                <h2>Ustawienia wyglądu</h2>

                <section>
                    <h3>Motywy – jasny tryb</h3>
                    {renderThemeGrid(LIGHT_THEMES)}
                </section>

                <section>
                    <h3>Motywy – ciemny tryb</h3>
                    {renderThemeGrid(DARK_THEMES)}
                </section>

                <section>
                    <h3>Paleta wykresu</h3>
                    <div className="settings-grid">
                        {Object.entries(CHART_PALETTES).map(([key, colors]) => (
                            <button
                                key={key}
                                className={`swatch-lg ${key === chartKey ? 'active' : ''}`}
                                style={{ background: getPalettePreview(colors) }}
                                onClick={() => setChartKey(key)}
                                title={key}
                            />
                        ))}
                    </div>
                </section>

                <section>
                    <h3>Tryb kolorystyki</h3>
                    <label className="dark-toggle">
                        <input
                            type="checkbox"
                            checked={darkMode}
                            onChange={e => setDarkMode(e.target.checked)}
                        />
                        <span className="slider" />
                        <span className="label">{darkMode ? 'Ciemny' : 'Jasny'}</span>
                    </label>
                </section>
            </main>
        </div>
    );
}