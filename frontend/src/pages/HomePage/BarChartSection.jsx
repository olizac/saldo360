import React from 'react';
import {ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Cell, LabelList } from 'recharts';
import { COLORS } from '../../data/colors';
import '../../styles/main.css';
import '../../styles/charts.css';

export default function BarChartSection({ data }) {
    return (
        <div className="chart-slide-inner">
            <h3 className="chart-heading">Wydatki dzienne (ostatnie 7 dni)</h3>

            <ResponsiveContainer width="100%" height={420}>
                <BarChart data={data} margin={{top: 20, right: 40, left: 40, bottom: 20}}>
                    <XAxis dataKey="day" tickLine={false}/>
                    <YAxis hide/>
                    <Bar dataKey="spent" radius={[4, 4, 0, 0]} barSize={60}>
                        {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]}/>)}
                        <LabelList
                            dataKey="spent"
                            position="top"
                            formatter={v => `${new Intl.NumberFormat('pl-PL').format(v)} zł`}
                            style={{fill: '#053342', fontWeight: 500}}
                        />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
