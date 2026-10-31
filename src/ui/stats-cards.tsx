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

interface PointData {
  id: 'tgeo' | 'shoth';
  x: number;
  y: number;
  title: string;
  subtitle: string;
  label: string;
  stars: string;
}

const POINTS: PointData[] = [
  {
    id: 'tgeo',
    x: 110,
    y: 101.5,
    title: '15★ звезд',
    subtitle: 'ТДжео (Темный Джеонозис)',
    label: 'ТДжео',
    stars: '15★',
  },
  {
    id: 'shoth',
    x: 242,
    y: 60.2,
    title: '36★ звезд',
    subtitle: 'СХот (Светлый Хот)',
    label: 'СХот',
    stars: '36★',
  },
];

const InteractiveTrendChart = ({ isTriggered }: { isTriggered: boolean }) => {
  const [active, setActive] = useState(false);
  const [hoveredId, setHoveredId] = useState<'tgeo' | 'shoth' | null>('shoth');

  useEffect(() => {
    if (active) return;
    if (!isTriggered) return;
    const timer = setTimeout(() => setActive(true), 250);
    return () => clearTimeout(timer);
  }, [isTriggered, active]);

  const curvePath = 'M 24 130 C 58 123, 82 109, 110 101.5 C 155 86, 196 68, 242 60.2 C 272 55, 294 48, 316 42';
  const areaPath = `${curvePath} L 316 130 L 24 130 Z`;

  const activePoint = POINTS.find((p) => p.id === hoveredId) || null;

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
          height: '165px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100px',
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
            viewBox="0 0 340 160"
            style={{
              width: '100%',
              height: '100%',
              overflow: 'visible',
            }}
          >
            <defs>
              <linearGradient id="trendAreaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0f172a" stopOpacity="0.16" />
                <stop offset="70%" stopColor="#0f172a" stopOpacity="0.04" />
                <stop offset="100%" stopColor="#0f172a" stopOpacity="0.0" />
              </linearGradient>

              <filter id="pointGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0f172a" floodOpacity="0.25" />
              </filter>
            </defs>

            <line x1="24" y1="30" x2="316" y2="30" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="24" y1="80" x2="316" y2="80" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="24" y1="130" x2="316" y2="130" stroke="#e2e8f0" strokeWidth="1.5" />

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
                strokeDasharray: 440,
                strokeDashoffset: active ? 0 : 440,
                transition: 'stroke-dashoffset 1.4s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />

            {activePoint && active && (
              <line
                x1={activePoint.x}
                y1={activePoint.y}
                x2={activePoint.x}
                y2="130"
                stroke="#94a3b8"
                strokeWidth="1.2"
                strokeDasharray="2 2"
                style={{
                  transition: 'x1 0.2s ease, x2 0.2s ease, y1 0.2s ease',
                }}
              />
            )}

            {POINTS.map((pt, idx) => {
              const isHovered = hoveredId === pt.id;
              const delay = idx === 0 ? 0.6 : 0.95;

              return (
                <g
                  key={pt.id}
                  onPointerEnter={() => setHoveredId(pt.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <circle cx={pt.x} cy={pt.y} r="22" fill="transparent" />

                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={isHovered ? '9' : '6'}
                    fill="#0f172a"
                    fillOpacity={isHovered ? 0.22 : 0.12}
                    style={{
                      transform: active ? 'scale(1)' : 'scale(0)',
                      transformOrigin: `${pt.x}px ${pt.y}px`,
                      transition: `transform 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, r 0.18s ease, fill-opacity 0.18s ease`,
                    }}
                  />

                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={isHovered ? '4.5' : '3.5'}
                    fill={isHovered ? '#ffffff' : '#0f172a'}
                    stroke="#0f172a"
                    strokeWidth={isHovered ? '2.5' : '0'}
                    filter="url(#pointGlow)"
                    style={{
                      transform: active ? 'scale(1)' : 'scale(0)',
                      transformOrigin: `${pt.x}px ${pt.y}px`,
                      transition: `transform 0.35s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, r 0.18s ease, fill 0.18s ease, stroke-width 0.18s ease`,
                    }}
                  />

                  <text
                    x={pt.x}
                    y={pt.y - 12}
                    textAnchor="middle"
                    fill={isHovered ? '#0f172a' : '#475569'}
                    fontSize={isHovered ? '12.5' : '11'}
                    fontWeight={isHovered ? '800' : '700'}
                    style={{
                      opacity: active ? 1 : 0,
                      transition: `opacity 0.4s ease ${delay + 0.1}s, font-size 0.15s ease, fill 0.15s ease`,
                    }}
                  >
                    {pt.stars}
                  </text>

                  <text
                    x={pt.x}
                    y="148"
                    textAnchor="middle"
                    fill={isHovered ? '#0f172a' : '#64748b'}
                    fontSize="12"
                    fontWeight={isHovered ? '700' : '500'}
                    style={{
                      transition: 'fill 0.15s ease, font-weight 0.15s ease',
                    }}
                  >
                    {pt.label}
                  </text>
                </g>
              );
            })}
          </svg>

          {activePoint && active && (
            <div
              style={{
                position: 'absolute',
                left: `${(activePoint.x / 340) * 100}%`,
                top: `${(activePoint.y / 160) * 100}%`,
                transform: 'translate(-50%, calc(-100% - 18px))',
                backgroundColor: '#0f172a',
                color: '#ffffff',
                padding: '6px 14px',
                borderRadius: '9px',
                boxShadow: '0 12px 28px -4px rgba(15, 23, 42, 0.32)',
                pointerEvents: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                whiteSpace: 'nowrap',
                zIndex: 20,
                animation: 'chartTooltipIn 0.18s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              }}
            >
              <span style={{ fontSize: '0.82rem', fontWeight: 700, lineHeight: 1.2 }}>
                {activePoint.title}
              </span>
              <span style={{ fontSize: '0.68rem', color: '#94a3b8', marginTop: '2px' }}>
                {activePoint.subtitle}
              </span>

              <div
                style={{
                  position: 'absolute',
                  bottom: '-5px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 0,
                  height: 0,
                  borderLeft: '5px solid transparent',
                  borderRight: '5px solid transparent',
                  borderTop: '5px solid #0f172a',
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, CSSProperties> = {
  whitePanel: {
    width: '100%',
    minHeight: '100dvh',
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'clamp(6rem, 12vh, 9.5rem) 2rem',
    color: '#0f172a',
    boxShadow: '0 32px 80px rgba(0, 0, 0, 0.3)',
  },
  sectionWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '1240px',
    userSelect: 'none',
  },
  sectionHeading: {
    color: '#0f172a',
    fontSize: 'clamp(2.1rem, 3.4vw, 2.85rem)',
    fontWeight: 400,
    letterSpacing: '-0.025em',
    marginBottom: 'clamp(3rem, 6vh, 4.5rem)',
    textAlign: 'center',
  },
  statsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    alignItems: 'flex-start',
    gap: 'clamp(2.5rem, 4.5vw, 4rem)',
    width: '100%',
  },
  statColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  headerRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.55rem',
  },
  headerTitle: {
    color: '#0f172a',
    fontSize: '1.25rem',
    fontWeight: 400,
    letterSpacing: '-0.015em',
  },
  counterRow: {
    display: 'flex',
    alignItems: 'baseline',
    color: '#0f172a',
    fontSize: 'clamp(2.5rem, 3.8vw, 3.25rem)',
    fontWeight: 700,
    letterSpacing: '-0.035em',
    lineHeight: 1,
    marginTop: 'clamp(1rem, 2vh, 1.4rem)',
  },
  revaImage: {
    width: '42px',
    height: '42px',
    objectFit: 'contain',
    marginRight: '0.55rem',
    flexShrink: 0,
    display: 'inline-block',
    verticalAlign: 'baseline',
    alignSelf: 'center',
    background: 'none',
  },
  counterSuffix: {
    marginLeft: '0.45rem',
    fontSize: 'clamp(1rem, 1.3vw, 1.2rem)',
    fontWeight: 500,
    color: '#64748b',
    letterSpacing: '-0.01em',
    lineHeight: 1,
    alignSelf: 'baseline',
  },
  descriptionText: {
    marginTop: 'clamp(0.85rem, 1.8vh, 1.25rem)',
    color: '#475569',
    fontSize: 'clamp(0.92rem, 1.1vw, 1rem)',
    lineHeight: 1.6,
    letterSpacing: '-0.01em',
  },
};

export const StatsCards = ({ isTriggered, style }: StatsCardsProps) => {
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (isTriggered && !hasStarted) {
      setHasStarted(true);
    }
  }, [isTriggered, hasStarted]);

  return (
    <div style={styles.whitePanel}>
      <div style={{ ...styles.sectionWrapper, ...style }}>
        <h2 style={styles.sectionHeading}>Все-все Циферки</h2>

        <div style={styles.statsRow}>
          <div style={styles.statColumn}>
            <div style={styles.headerRow}>
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
                  stroke="#0f172a"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span style={styles.headerTitle}>Наша мощь</span>
            </div>

            <div style={styles.counterRow}>
              <DigitReel targetDigit={3} delayMs={100} isTriggered={hasStarted} />
              <DigitReel targetDigit={0} delayMs={240} isTriggered={hasStarted} />
              <DigitReel targetDigit={0} delayMs={380} isTriggered={hasStarted} />
              <span style={styles.counterSuffix}>млн гм</span>
            </div>

            <p style={styles.descriptionText}>
              Уверенно растем и наращиваем суммарную мощь без лишней нервотрепки и духоты. Каждый участник развивает свой склад с умом, получая максимум отдачи, пока гильдия стабильно держит высокую планку в своем сегменте.
            </p>
          </div>

          <div style={styles.statColumn}>
            <div style={styles.headerRow}>
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
                  stroke="#0f172a"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span style={styles.headerTitle}>Что по фарму</span>
            </div>

            <div style={styles.counterRow}>
              <img src="/reva.png" alt="Рева" style={styles.revaImage} />
              <DigitReel targetDigit={3} delayMs={150} isTriggered={hasStarted} />
              <DigitReel targetDigit={5} delayMs={300} isTriggered={hasStarted} />
              <span style={styles.counterSuffix}>осколков</span>
            </div>

            <p style={styles.descriptionText}>
              Меньше чем за год с нуля вышли на стабильный фарм Ревы. За одну ВИ забираем в среднем 35 осколков — четкие офицерские гайды, правильные модули и слаженность состава превращают сложные битвы в понятную рутину.
            </p>
          </div>

          <div style={styles.statColumn}>
            <div style={styles.headerRow}>
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                  stroke="#0f172a"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span style={styles.headerTitle}>Звёзды за ВИ</span>
            </div>

            <InteractiveTrendChart isTriggered={hasStarted} />

            <p style={styles.descriptionText}>
              Забираем максимум звезд на ключевых картах: стабильные 15 на Темном Джео и 36 на Светлом Хоте благодаря дисциплине и точечным приказам офицеров.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;
