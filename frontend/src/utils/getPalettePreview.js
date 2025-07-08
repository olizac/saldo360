export const getPalettePreview = (arr) => {
    const step = 100 / arr.length;
    const segments = arr
        .map((color, i) => {
            const start = Math.round(i * step);
            const end = Math.round((i + 1) * step);
            return `${color} ${start}% ${end}%`;
        })
        .join(', ');
    return `linear-gradient(to right, ${segments})`;
};
