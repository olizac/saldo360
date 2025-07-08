import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { monthData, monthTotal, weekData } from '../../data/charts';
import '../../styles/main.css';
import '../../styles/homepage.css';
import BarChartSection from "./BarChartSection.jsx";
import PieChartSection from './PieChartSection';
import TransactionList from "./TransactionList.jsx";
import DotPager from "../../ui/DotPager.jsx";

export default function HomePage() {
  const [slide,setSlide]         = useState(0);
  const [isModalOpen,setModal]         = useState(false);

  const AddTransactionModal = () => null;

  const handleSlide = (i) => {
    const el = sliderRef.current;
    el.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' });
    setSlide(i);
  };

  return (
      <>
        <main className="main">
          <div className="dashboard">

            {/* 1. SUMMARY */}
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

            {/* 2. CHARTS */}
            <section className="chart-card">
              <div className="chart-slider"
                   onScroll={e => setSlide(
                       Math.round(e.target.scrollLeft / e.target.clientWidth)
                   )}>
                <div className="chart-slide">
                  <PieChartSection data={monthData}/>
                </div>
                <div className="chart-slide">
                  <BarChartSection data={weekData}/>
                </div>
                </div>

              <DotPager slides={2} current={slide} onSelect={handleSlide} />
            </section>

            {/* 3. NEWEST TRANSACTIONS */}
            <TransactionList/>

            {/* 4. TODO : 4th section */}
            <section className="monthly-summary-card">
              <p>
                W tym miesiącu:&nbsp;
                <strong>wydatki: 4 200 zł</strong> &nbsp;|&nbsp;
                <strong>przychody: 5 000 zł</strong>
              </p>
            </section>

          </div>
        </main>

        <button className="fab" onClick={()=>setModal(true)}>
          <Plus size={48} strokeWidth={3}/>
        </button>
        {isModalOpen && <AddTransactionModal />}
      </>
  );
}
