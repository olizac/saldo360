import React from 'react';

export default function DotPager({ slides, current, onSelect }) {
    return (
        <div className="chart-dots">
            {Array.from({ length: slides }, (_, i) => (
                <button
                    key={i}
                    className={current === i ? 'dot active' : 'dot'}
                    onClick={() => onSelect(i)}
                />
            ))}
        </div>
    );
}
