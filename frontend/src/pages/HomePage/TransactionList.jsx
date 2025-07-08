import React from 'react';
import { Zap, ShoppingCart, Tv, Bus, Wallet } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import '../../styles/main.css';
import '../../styles/transactionList.css';

export default function TransactionList({ items }) {
    return (
        <section className="transactions-card">
            <h3>Ostatnie transakcje</h3>
            <div className="transaction"><Zap size={24}/><span>Prąd</span>
                <span className="amount out">-220 zł</span></div>
            <div className="transaction"><ShoppingCart size={24}/><span>Zakupy</span>
                <span className="amount out">-153 zł</span></div>
            <div className="transaction"><Tv size={24}/><span>Netflix</span>
                <span className="amount out">-60 zł</span></div>
            <div className="transaction"><Bus size={24}/><span>Bilet autobusowy</span>
                <span className="amount out">-3 zł</span></div>
            <div className="transaction"><Wallet size={24}/><span>Wypłata</span>
                <span className="amount in">+5 000 zł</span></div>
            <div className="see-more-wrapper">
                <NavLink to="/transakcje" className="see-more-link">
                    Zobacz więcej ›
                </NavLink>
            </div>
        </section>
    );
}
