import { useEffect, useState, type CSSProperties } from 'react';

export interface StatsCardsProps {
  isTriggered: boolean;
  style?: CSSProperties;
}

const DIGITS = [0, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

const DigitReel = ({
  targetDigit,
  delayMs,
  isTriggered,
}: {
  targetDigit: number;
  delayMs: number;
  isTriggered: boolean;
}) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (active) return;
    if (!isTriggered) return;
    const timer = setTimeout(() => setActive(true), delayMs);
    return () => clearTimeout(timer);
  }, [isTriggered, delayMs, active]);

  const digitHeight = 48;
  const targetIndex = DIGITS.lastIndexOf(targetDigit);
  const translateY = active ? -targetIndex * digitHeight : 0;

  return (
    <div
      style={{
        display: 'inline-block',
        height: `${digitHeight}px`,
        overflow: 'hidden',
        verticalAlign: 'baseline',
        lineHeight: `${digitHeight}px`,
      }}
    >
      <div
        style={{
          transform: `translate3d(0, ${translateY}px, 0)`,
          transition: active
            ? 'transform 1.4s cubic-bezier(0.16, 1, 0.3, 1)'
            : 'none',
          willChange: 'transform',
        }}
      >
        {DIGITS.map((num, i) => (
          <div
            key={i}
            style={{
              height: `${digitHeight}px`,
              lineHeight: `${digitHeight}px`,
              textAlign: 'center',
            }}
          >
            {num}
          </div>
        ))}
      </div>
    </div>
  );
};

interface TooltipData {
  title: string;
  subtitle: string;
  xPercent: number;
  yPercent: number;
}

const TrendChart = ({ isTriggered }: { isTriggered: boolean }) => {
  const [active, setActive] = useState(false);
  const [hoveredKey, setHoveredKey] = useState<'p1' | 'p2' | null>(null);

  useEffect(() => {
    if (active) return;
    if (!isTriggered) return;
    const timer = setTimeout(() => setActive(true), 250);
    return () => clearTimeout(timer);
  }, [isTriggered, active]);

  const p1 = { x: 105, y: 96.5 };
  const p2 = { x: 235, y: 56.6 };

  const curvePath = 'M 24 125 C 55 118, 78 104, 105 96.5 C 150 82, 190 64, 235 56.6 C 265 51, 288 45, 308 40';
  const areaPath = `${curvePath} L 308 125 L 24 125 Z`;

  let currentTooltip: TooltipData | null = null;
  if (hoveredKey === 'p1') {
    currentTooltip = {
      title: '15★ звезд',
      subtitle: 'ТДжео (Темный Джео)',
      xPercent: (p1.x / 320) * 100,
      yPercent: (p1.y / 150) * 100,
    };
  } else if (hoveredKey === 'p2') {
    currentTooltip = {
      title: '36★ звезд',
      subtitle: 'СХот (Светлый Хот)',
      xPercent: (p2.x / 320) * 100,
      yPercent: (p2.y / 150) * 100,
    };
  }

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        marginTop: 'clamp(0.85rem, 1.8vh, 1.25rem)',
        userSelect: 'none',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          height: '160px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '95px',
            marginBottom: '26px',
            paddingRight: '8px',
            fontSize: '0.72rem',
            fontWeight: 500,
            color: '#94a3b8',
            textAlign: 'right',
            width: '42px',
            flexShrink: 0,
          }}
        >
          <span>50★</span>
          <span>25★</span>
          <span>0★</span>
        </div>

        <div style={{ position: 'relative', flex: 1, height: '100%' }}>
          <svg
            viewBox="0 0 320 150"
            style={{
              width: '100%',
              height: '100%',
              overflow: 'visible',
            }}
          >
            <defs>
              <linearGradient id="trendAreaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0f172a" stopOpacity="0.14" />
                <stop offset="100%" stopColor="#0f172a" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            <line x1="24" y1="30" x2="308" y2="30" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="24" y1="77.5" x2="308" y2="77.5" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="24" y1="125" x2="308" y2="125" stroke="#e2e8f0" strokeWidth="1.5" />

            {hoveredKey === 'p1' && (
              <line
                x1={p1.x}
                y1={p1.y}
                x2={p1.x}
                y2="125"
                stroke="#94a3b8"
                strokeWidth="1.2"
                strokeDasharray="2 2"
              />
            )}
            {hoveredKey === 'p2' && (
              <line
                x1={p2.x}
                y1={p2.y}
                x2={p2.x}
                y2="125"
                stroke="#94a3b8"
                strokeWidth="1.2"
                strokeDasharray="2 2"
              />
            )}

            <path
              d={areaPath}
              fill="url(#trendAreaGrad)"
              style={{
                opacity: active ? 1 : 0,
                transition: 'opacity 1s ease 0.3s',
              }}
            />

            <path
              d={curvePath}
              fill="none"
              stroke="#0f172a"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                strokeDasharray: 420,
                strokeDashoffset: active ? 0 : 420,
                transition: 'stroke-dashoffset 1.4s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />

            <g
              onMouseEnter={() => setHoveredKey('p1')}
              onMouseLeave={() => setHoveredKey(null)}
              style={{ cursor: 'pointer' }}
            >
              <circle cx={p1.x} cy={p1.y} r="22" fill="transparent" />
              <circle
                cx={p1.x}
                cy={p1.y}
                r={hoveredKey === 'p1' ? '11' : '6'}
                fill="#0f172a"
                fillOpacity={hoveredKey === 'p1' ? '0.22' : '0.12'}
                style={{
                  transform: active ? 'scale(1)' : 'scale(0)',
                  transformOrigin: `${p1.x}px ${p1.y}px`,
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />
              <circle
                cx={p1.x}
                cy={p1.y}
                r={hoveredKey === 'p1' ? '5' : '3.5'}
                fill="#0f172a"
                style={{
                  transform: active ? 'scale(1)' : 'scale(0)',
                  transformOrigin: `${p1.x}px ${p1.y}px`,
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />
              <text
                x={p1.x}
                y={p1.y - 12}
                textAnchor="middle"
                fill="#0f172a"
                fontSize="11"
                fontWeight="700"
                style={{
                  opacity: active ? 1 : 0,
                  transition: 'opacity 0.4s ease 0.7s',
                }}
              >
                15★
              </text>
              <text
                x={p1.x}
                y="142"
                textAnchor="middle"
                fill={hoveredKey === 'p1' ? '#0f172a' : '#64748b'}
                fontSize="11.5"
                fontWeight={hoveredKey === 'p1' ? '700' : '500'}
                style={{ transition: 'color 0.2s ease' }}
              >
                ТДжео
              </text>
            </g>

            <g
              onMouseEnter={() => setHoveredKey('p2')}
              onMouseLeave={() => setHoveredKey(null)}
              style={{ cursor: 'pointer' }}
            >
              <circle cx={p2.x} cy={p2.y} r="22" fill="transparent" />
              <circle
                cx={p2.x}
                cy={p2.y}
                r={hoveredKey === 'p2' ? '
