// src/pages/HomePage.jsx
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  PieChart, Pie, Cell, Tooltip, Sector,
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer,
  LabelList
} from 'recharts';
import { Wallet, Plus, Bus, Tv, ShoppingCart, Zap } from 'lucide-react';

import '../styles/homepage.css';
import AddTransaction      from './AddTransaction.jsx';
import { THEMES }          from '../styles/Themes.js';
import { CHART_PALETTES }  from '../styles/ChartPalettes.js';

const RAD     = Math.PI / 180;
const COLORS  = CHART_PALETTES.default;          // 7-kolorowa paleta
const renderActiveShape = p => {
  const { cx, cy, midAngle, innerRadius, outerRadius,
    startAngle, endAngle, fill } = p;
  const dx = Math.cos(-RAD * midAngle) * 4;
  const dy = Math.sin(-RAD * midAngle) * 4;
  return (
      <g filter="url(#shadow)">
        <Sector
            cx={cx + dx} cy={cy + dy}
            innerRadius={innerRadius} outerRadius={outerRadius}
            startAngle={startAngle} endAngle={endAngle}
            fill={fill}
        />
      </g>
  );
};

/* ==== demo-dane ==== */
const monthData = [
  { name:'Jedzenie',  value:2400 },
  { name:'Transport', value:1850 },
  { name:'Rachunki',  value:1200 },
  { name:'Rozrywka',  value: 900 },
  { name:'Inne',      value: 600 },
];
const monthTotal = monthData.reduce((s,d)=>s+d.value,0);

const weekData = [
  { day:'Pn', spent:620 },
  { day:'Wt', spent:480 },
  { day:'Śr', spent:530 },
  { day:'Cz', spent:700 },
  { day:'Pt', spent:350 },
  { day:'Sb', spent:910 },
  { day:'Nd', spent:610 },
];

export default function HomePage() {
  /* >>> motyw <<< */
  const { main,dark,light } = THEMES.peach;
  useEffect(()=>{
    const r=document.documentElement;
    r.style.setProperty('--teal-main', main);
    r.style.setProperty('--teal-dark', dark);
    r.style.setProperty('--teal-light', light);
  },[]);

  /* stany UI */
  const [activeIdx,setActiveIdx] = useState(-1);
  const [slide,setSlide]         = useState(0);
  const [modal,setModal]         = useState(false);

  /* tooltip */
  const PieTip = ({active,payload})=>{
    if(!active||!payload?.length) return null;
    const {name,value}=payload[0];
    return (
        <div className="tooltip-box">
          <strong>{name}</strong> {value} zł ({Math.round(value/monthTotal*100)}%)
        </div>
    );
  };

  /* ===== render ===== */
  return (
      <>
        <main className="main">
          <div className="dashboard">

            {/* 1️⃣ PODSUMOWANIE */}
            <section className="summary-card">
              <div className="summary-left">
                <div className="balance">-2 500 zł</div>
              </div>
              <div className="summary-right">
                <p className="spent-summary">
                  W tym miesiącu wydałeś <strong>4 200 zł</strong><br/>
                  <span className="trend">↑ więcej niż w poprzednim miesiącu</span>
                </p>
              </div>
            </section>


            {/* 2️⃣  KARTA WYKRESÓW */}
            <section className="chart-card">
              <div className="chart-slider"
                   onScroll={e => setSlide(
                       Math.round(e.target.scrollLeft / e.target.clientWidth)
                   )}>

                {/* ── slajd 1 ── */}
                <div className="chart-slide">
                  <div className="chart-slide-inner">{/* ⚙️ patrz CSS niżej */}
                    <h3 className="chart-heading">
                      Wydatki w tym miesiącu
                    </h3>

                    <div className="chart-visuals">
                      <PieChart width={420} height={420}>
                        <defs>
                          <filter id="shadow" x="-10%" y="-10%"
                                  width="130%" height="130%">
                            <feDropShadow dx="0" dy="2"
                                          stdDeviation="4" floodOpacity="0.15"/>
                          </filter>
                        </defs>
                        <Pie data={monthData}
                             dataKey="value"
                             outerRadius={180}
                             strokeWidth={4}
                             activeIndex={activeIdx}
                             activeShape={renderActiveShape}
                             onMouseEnter={(_,i)=>setActiveIdx(i)}
                             onMouseLeave={()=>setActiveIdx(-1)}>
                          {monthData.map((_,i)=>
                              <Cell key={i} fill={COLORS[i%COLORS.length]}/>
                          )}
                        </Pie>
                        <Tooltip content={<PieTip/>}
                                 wrapperStyle={{outline:'none'}}/>
                      </PieChart>

                      {/* legenda */}
                      <div className="legend">
                        {monthData.map((d,i)=>(
                            <div key={d.name} className="legend-row">
                          <span className="legend-color"
                                style={{background:COLORS[i%COLORS.length]}}/>
                              <span className="legend-label">{d.name}</span>
                              <div className="legend-numbers">
                            <span className="legend-value">
                              {new Intl.NumberFormat('pl-PL')
                                  .format(d.value)}&nbsp;zł
                            </span>
                                <span className="legend-percent">
                              ({Math.round(d.value/monthTotal*100)}%)
                            </span>
                              </div>
                            </div>
                        ))}
                      </div>
                    </div>{/* .chart-visuals */}
                  </div>{/* .chart-slide-inner */}
                </div>

                {/* ---------- slajd 2: wykres kolumnowy ---------- */}
                <div className="chart-slide">
                  <div className="chart-slide-inner">
                    <h3 className="chart-heading">Wydatki dzienne (ostatnie 7 dni)</h3>

                    <ResponsiveContainer width="100%" height={420}>
                      <BarChart
                          data={weekData}
                          margin={{ top: 20, right: 40, left: 40, bottom: 20 }}
                          barCategoryGap="10%"             // szersze rozstawienie
                      >
                        <XAxis dataKey="day" tickLine={false} />
                        <YAxis hide />
                        {/*  usuwamy <Tooltip/>  */}

                        <Bar
                            dataKey="spent"
                            radius={[4, 4, 0, 0]}
                            barSize={60}                   // stała szerokość jednego słupka
                        >
                          {weekData.map((_, i) => (
                              <Cell key={i} fill={COLORS[i % COLORS.length]} />
                          ))}

                          {/*  etykiety nad słupkami  */}
                          <LabelList
                              dataKey="spent"
                              position="top"
                              formatter={v => `${new Intl.NumberFormat('pl-PL').format(v)} zł`}
                              style={{ fill: '#053342', fontWeight: 500 }} // ← ustaw kolor czarny
                          />

                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>


              </div>{/* .chart-slider */}

              {/* kropki nawigujące */}
              <div className="chart-dots">
                {[0,1].map(i=>(
                    <button key={i}
                            className={slide===i?'dot active':'dot'}
                            onClick={()=>{
                              const el=document.querySelector('.chart-slider');
                              el.scrollTo({left:i*el.clientWidth,behavior:'smooth'});
                              setSlide(i);
                            }}/>
                ))}
              </div>
            </section>

            {/* 3️⃣ TRANSAKCJE (bez zmian) */}
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

            {/* 4️⃣ PODSUMOWANIE MIESIĄCA */}
            <section className="monthly-summary-card">
              <p>
                W tym miesiącu:&nbsp;
                <strong>wydatki: 4 200 zł</strong> &nbsp;|&nbsp;
                <strong>przychody: 5 000 zł</strong>
              </p>
            </section>

          </div>
        </main>

        {/* FAB + modal */}
        <button className="fab" onClick={()=>setModal(true)}>
          <Plus size={48} strokeWidth={3}/>
        </button>
        {modal && (
            <AddTransaction
                onClose={()=>setModal(false)}
                onSubmit={d=>console.log('Nowa transakcja:',d)}
            />
        )}
      </>
  );
}
