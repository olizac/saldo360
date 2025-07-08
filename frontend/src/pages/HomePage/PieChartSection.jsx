import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Sector } from 'recharts';
import { COLORS } from '../../data/colors';
import '../../styles/main.css';
import '../../styles/charts.css';


const RAD = Math.PI / 180;
const renderActive = (props) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
    const dx = Math.cos(-RAD * midAngle) * 4;
    const dy = Math.sin(-RAD * midAngle) * 4;
    return <Sector {...{ cx: cx + dx, cy: cy + dy, innerRadius, outerRadius, startAngle, endAngle, fill }} />;
};

const PieTip = ({ active, payload, total }) => {
    if (!active || !payload?.length) return null;
    const { name, value } = payload[0];
    return (
        <div className="tooltip-box">
            <strong>{name}</strong> {value} zł ({Math.round(value / total * 100)}%)
        </div>
    );
};

export default function PieChartSection({ data }) {
    const [active, setActive] = useState(-1);
    const monthTotal = data.reduce((s, d) => s + d.value, 0);

    return (
        <div className="chart-slide-inner">
            <h3 className="chart-heading">Wydatki w tym miesiącu</h3>
                <div className="chart-visuals">
                                <PieChart width={420} height={420}>
                                    <Pie
                                        data={data}
                                        dataKey="value"
                                        outerRadius={180}
                                        activeIndex={active}
                                        activeShape={renderActive}
                                        onMouseEnter={(_, i) => setActive(i)}
                                        onMouseLeave={() => setActive(-1)}
                                    >
                                        {data.map((_, i) => (
                                            <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                        ))}
                                    </Pie>

                                    <Tooltip content={<PieTip total={monthTotal} />} wrapperStyle={{ outline: 'none' }} />
                                </PieChart>

                                <div className="legend">
                                    {data.map((d, i) => (
                                        <div key={d.name} className="legend-row">
                                            <span className="legend-color" style={{ background: COLORS[i % COLORS.length] }} />
                                            <span className="legend-label">{d.name}</span>
                                            <div className="legend-numbers">
                                <span className="legend-value">
                                  {new Intl.NumberFormat('pl-PL').format(d.value)}&nbsp;zł
                                </span>
                                                <span className="legend-percent">
                                  ({Math.round((d.value / monthTotal) * 100)}%)
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

