export const monthData = [
    { name:'Jedzenie',  value:2400 },
    { name:'Transport', value:1850 },
    { name:'Rachunki',  value:1200 },
    { name:'Rozrywka',  value: 900 },
    { name:'Inne',      value: 600 },
];
export const monthTotal = monthData.reduce((s, d)=>s+d.value,0);
export const weekData = [
    { day:'Pn', spent:620 },
    { day:'Wt', spent:480 },
    { day:'Śr', spent:530 },
    { day:'Cz', spent:700 },
    { day:'Pt', spent:350 },
    { day:'Sb', spent:910 },
    { day:'Nd', spent:610 },
];