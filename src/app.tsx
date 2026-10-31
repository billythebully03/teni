import { useMemo } from 'react';
import { Lanyard } from './ui/lanyard';

const FRONT_CARD_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1440" width="1024" height="1440">
  <rect width="1024" height="1440" fill="#ffffff"/>
  <circle cx="512" cy="720" r="340" fill="#f8fafc" opacity="0.6"/>
  <text 
    x="512" 
    y="740" 
    text-anchor="middle" 
    fill="#0f172a" 
    font-family="system-ui, -apple-system, sans-serif" 
    font-size="64" 
    font-weight="800" 
    letter-spacing="-0.02em"
  >
    Те, кто в тени
  </text>
  <line x1="432" y1="785" x2="592" y2="785" stroke="#e2e8f0" stroke-width="4" stroke-linecap="round"/>
</svg>
`.trim();

const BACK_CARD_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1440" width="1024" height="1440">
  <rect width="1024" height="1440" fill="#ffffff"/>
  <text 
    x="512" 
    y="610" 
    text-anchor="middle" 
    fill="#0f172a" 
    font-family="system-ui, -apple-system, sans-serif" 
    font-size="52" 
    font-weight="700" 
    letter-spacing="-0.01em"
  >
    Подать заявку
  </text>
  <g transform="translate(132, 670)">
    <rect 
      width="760" 
      height="110" 
      rx="24" 
      fill="#f8fafc" 
      stroke="#cbd5e1" 
      stroke-width="3"
    />
    <text 
      x="44" 
      y="67" 
      fill="#94a3b8" 
      font-family="system-ui, -apple-system, sans-serif" 
      font-size="32" 
      font-weight="400"
    >
      Введите контактные данные...
    </text>
    <rect 
      x="44" 
      y="38" 
      width="2" 
      height="38" 
      fill="#64748b"
    />
  </g>
</svg>
`.trim();

export const App = () => {
  const frontImageUri = useMemo(
    () => `data:image/svg+xml;utf8,${encodeURIComponent(FRONT_CARD_SVG)}`,
    []
  );

  const backImageUri = useMemo(
    () => `data:image/svg+xml;utf8,${encodeURIComponent(BACK_CARD_SVG)}`,
    []
  );

  return (
    <main style={{ width: '100%', height: '100dvh' }}>
      <Lanyard
        frontImage={frontImageUri}
        backImage={backImageUri}
        cardColor="#ffffff"
        finish="glossy"
        metal="silver"
        anchor="center"
        strapColor="#111111"
        strapLength={0.45}
        elasticity={0.2}
        damping={0.55}
        intro={true}
        interactive={true}
      />
    </main>
  );
};
