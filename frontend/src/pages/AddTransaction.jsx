import React, { useState } from 'react';
import '../styles/addtransaction.css';
import {
    /* podstawowe kategorie */
    Pizza, Zap, Bus, Tv, ShoppingCart,
    /* grupy ikon */
    Wallet, Banknote, FileText, Car, Fuel, Plane,
    Home, Hammer, Shirt, Sparkles, BookOpen,
    GraduationCap, HeartPulse, Syringe,
    Gamepad2, Clapperboard, Music4, BedDouble,
    Umbrella, Tags, X, Plus
} from 'lucide-react';

/* ------- kategorie z wykresu (nazwa • kolor) ------- */
const CATEGORIES = [
    { label: 'Jedzenie',      value: 'food',          icon: Pizza, color: '#ffb6b9' },
    { label: 'Rachunki',      value: 'bills',         icon: Zap,   color: '#fae3d9' },
    { label: 'Transport',     value: 'transport',     icon: Bus,   color: '#bbded6' },
    { label: 'Rozrywka',      value: 'entertainment', icon: Tv,    color: '#61c0bf' },
    { label: 'Inne',          value: 'others',        icon: ShoppingCart, color: '#fcf5c7' },
];

/* ------- dodatkowe ikonki pogrupowane ------- */
const ICON_GROUPS = [
    { name:'Finanse',   icons:[{value:'wallet',Icon:Wallet},{value:'bank',Icon:Banknote},{value:'loan',Icon:FileText}]},
    { name:'Transport', icons:[{value:'car',Icon:Car},{value:'bus',Icon:Bus},{value:'fuel',Icon:Fuel},{value:'plane',Icon:Plane}]},
    { name:'Dom',       icons:[{value:'home',Icon:Home},{value:'tools',Icon:Hammer}]},
    { name:'Jedzenie / Zakupy', icons:[{value:'pizza',Icon:Pizza},{value:'shopping',Icon:ShoppingCart},{value:'tags',Icon:Tags}]},
    { name:'Uroda i Odzież',    icons:[{value:'shirt',Icon:Shirt},{value:'beauty',Icon:Sparkles}]},
    { name:'Edukacja i Zdrowie',icons:[
            {value:'book',Icon:BookOpen},{value:'school',Icon:GraduationCap},
            {value:'health',Icon:HeartPulse},{value:'pharmacy',Icon:Syringe}]},
    { name:'Rozrywka', icons:[{value:'tv',Icon:Tv},{value:'game',Icon:Gamepad2},{value:'movie',Icon:Clapperboard},{value:'music',Icon:Music4}]},
    { name:'Wyjazdy / Rekreacja', icons:[{value:'hotel',Icon:BedDouble},{value:'beach',Icon:Umbrella}]},
];

/* skrócony słownik kolorów (używamy w stylach inline) */
const categoryColors = Object.fromEntries(
    CATEGORIES.map(c => [c.value, c.color])
);

const today = new Date().toISOString().split('T')[0];

export default function AddTransaction({ onClose, onSubmit }) {
    const [form, setForm] = useState({
        amount: '',
        type: 'expense',
        category: 'food',
        icon: 'pizza',
        note: '',
        date: today,
    });
    const [showIcons, setShowIcons] = useState(false);

    /* ---------- helpers ---------- */
    const handleChange = ({ target }) => {
        const { name, value } = target;
        setForm(prev => ({ ...prev, [name]: value }));
        if (name === 'category') {
            /* po zmianie kategorii – ustaw domyślną ikonę kategorii */
            const cat = CATEGORIES.find(c => c.value === value);
            if (cat) setForm(prev => ({ ...prev, icon: cat.value }));
        }
    };

    const handleAmountChange = ({ target }) => {
        const val = target.value.replace(',', '.');
        if (/^\d*([.]\d{0,2})?$/.test(val) || val === '') {
            setForm(prev => ({ ...prev, amount: val }));
        }
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (!form.amount)  return alert('Podaj kwotę.');
        if (+form.amount <= 0) return alert('Kwota musi być większa od zera.');
        if (form.date > today) return alert('Data nie może być w przyszłości.');
        onSubmit(form);
        onClose();
    };

    /* aktualna ikonka na przycisku dropdownu */
    const CurrentIcon =
        ICON_GROUPS.flatMap(g => g.icons).find(i => i.value === form.icon)?.Icon ||
        CATEGORIES.find(c => c.value === form.category)?.icon || Pizza;

    /* ---------- UI ---------- */
    return (
        <div className="modal-backdrop">
            <div className="modal">
                {/* nagłówek */}
                <div className="modal-header">
                    <h2><Plus size={18}/> Dodaj transakcję</h2>
                    <button className="close-btn" onClick={onClose}><X/></button>
                </div>

                <form className="form" onSubmit={handleSubmit}>
                    {/* kwota */}
                    <label>Kwota (zł)</label>
                    <div className="amount-field inside">
<span
    className={`sign-inside ${form.type === 'income' ? 'income' : 'expense'}`}
    title={form.type === 'income' ? 'Przychód' : 'Wydatek'}
    onClick={() => setForm(p => ({...p, type: p.type === 'income' ? 'expense' : 'income'}))}
>
  {form.type === 'income' ? '+' : '–'}
</span>


                        <input
                            name="amount"
                            type="text"
                            inputMode="decimal"
                            pattern="^\\d+([.,]\\d{1,2})?$"
                            placeholder="kwota"
                            value={form.amount}
                            onChange={handleAmountChange}
                            required
                        />
                    </div>


                    {/* kategoria */}
                    <label>Kategoria</label>
                    <div className="category-row">
                        {/* „pigułka” */}
                        <div
                            className="category-pill"
                            /* dla feedbacku focus */
                            style={{'--pill-color': categoryColors[form.category] || '#ccc'}}
                        >
              <span
                  className="category-dot"
                  style={{background: categoryColors[form.category] || '#ccc'}}
              />
                            <select
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                className="category-select"
                            >
                                {CATEGORIES.map(c => (
                                    <option key={c.value} value={c.value}>{c.label}</option>
                                ))}
                            </select>
                        </div>

                        {/* wybór ikon */}
                        <div className="icon-dropdown">
                            <button
                                type="button"
                                className="icon-toggle"
                                onClick={() => setShowIcons(s => !s)}
                            >
                                <CurrentIcon size={20}/> <span className="arrow">▾</span>
                            </button>

                            {showIcons && (
                                <div className="icon-panel">
                                    {ICON_GROUPS.map(({name, icons}) => (
                                        <div key={name} className="icon-group">
                                            <div className="icon-group-label">{name}</div>
                                            <div className="icon-grid">
                                                {icons.map(({value, Icon}) => (
                                                    <button
                                                        key={value}
                                                        type="button"
                                                        className={`icon-btn ${form.icon === value ? 'selected' : ''}`}
                                                        onClick={() => {
                                                            setForm(prev => ({...prev, icon: value}));
                                                            setShowIcons(false);
                                                        }}
                                                        title={value}
                                                    >
                                                        <Icon size={20}/>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* notatka */}
                    <label>Notatka</label>
                    <textarea
                        name="note"
                        placeholder="(opcjonalnie)"
                        value={form.note}
                        onChange={handleChange}
                    />

                    {/* data */}
                    <label>Data</label>
                    <input
                        name="date"
                        type="date"
                        max={today}
                        value={form.date}
                        onChange={handleChange}
                    />

                    <button type="submit" className="submit-btn">Dodaj transakcję</button>
                </form>
            </div>
        </div>
    );
}
