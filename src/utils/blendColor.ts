export function blendColor(gray: string, darkRed: string, priority: number): string {
    const hexToRgb = (hex: string) => {
        const clean = hex.replace('#', '');
        return [
            parseInt(clean.substring(0, 2), 16),
            parseInt(clean.substring(2, 4), 16),
            parseInt(clean.substring(4, 6), 16),
        ];
    };

    const [r1, g1, b1] = hexToRgb(gray);
    const [r2, g2, b2] = hexToRgb(darkRed);

    const r = Math.round(r1 + (r2 - r1) * priority);
    const g = Math.round(g1 + (g2 - g1) * priority);
    const b = Math.round(b1 + (b2 - b1) * priority);
    
    const rgbToHex = (r: number, g: number, b: number) =>
        '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');

    return rgbToHex(r, g, b);
}