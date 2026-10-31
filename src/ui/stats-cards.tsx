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
  label: string;
  stars: string;
}

const POINTS: PointData[] = [
  {
    id: 'tgeo',
    x: 110,
    y: 101.5,
    label: 'ТДжео',
    stars: '15★',
  },
  {
    id: 'shoth',
    x: 242,
    y: 60.2,
    label: 'СХот',
    stars: '36★',
  },
];

const PleasantRedTrendChart = ({ isTriggered }: { isTriggered: boolean }) => {
  const [active, setActive] = useState(false);
  const [hoveredId, setHoveredId] = useState<'tgeo' | 'shoth' | null>(null);

  useEffect(() => {
    if (active) return;
    if (!isTriggered) return;
    const timer = setTimeout(() => setActive(true), 250);
    return () => clearTimeout(timer);
  }, [isTriggered, active]);

  const curvePath = 'M 24 130 C 58 123, 82 109, 110 101.5 C 155 86, 196 68, 242 60.2 C 272 55, 294 48, 316 42';
  const areaPath = `${curvePath} L 316 130 L 24 130 Z`;

  const RED_ACCENT = '#e11d48';

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
            fontSize: '0.74rem',
            fontWeight: 600,
            color: '#94a3b8',
            textAlign: 'right',
            width: '38px',
            flexShrink: 0,
          }}
        >
          <span>50*</span>
          <span>25*</span>
          <span>0*</span>
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
              <linearGradient id="pleasantRedAreaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={RED_ACCENT} stopOpacity="0.18" />
                <stop offset="70%" stopColor={RED_ACCENT} stopOpacity="0.04" />
                <stop offset="100%" stopColor={RED_ACCENT} stopOpacity="0.0" />
              </linearGradient>

              <filter id="pointRedGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor={RED_ACCENT} floodOpacity="0.35" />
              </filter>
            </defs>

            <line x1="24" y1="30" x2="316" y2="30" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="24" y1="80" x2="316" y2="80" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />

            <path
              d={areaPath}
              fill="url(#pleasantRedAreaGrad)"
              style={{
                opacity: active ? 1 : 0,
                transition: 'opacity 1s ease 0.3s',
              }}
            />

            <path
              d={curvePath}
              fill="none"
              stroke={RED_ACCENT}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                strokeDasharray: 440,
                strokeDashoffset: active ? 0 : 440,
                transition: 'stroke-dashoffset 1.4s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />

            {POINTS.map((pt, idx) => {
              const isHovered = hoveredId === pt.id;
              const delay = idx === 0 ? 0.6 : 0.95;

              return (
                <g
                  key={pt.id}
                  onPointerEnter={() => setHoveredId(pt.id)}
                  onPointerLeave={() => setHoveredId(null)}
                  style={{ cursor: 'pointer' }}
                >
                  <circle cx={pt.x} cy={pt.y} r="22" fill="transparent" />

                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={isHovered ? '9' : '6'}
                    fill={RED_ACCENT}
                    fillOpacity={isHovered ? 0.25 : 0.12}
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
                    fill={isHovered ? '#ffffff' : RED_ACCENT}
                    stroke={RED_ACCENT}
                    strokeWidth={isHovered ? '2.5' : '0'}
                    filter="url(#pointRedGlow)"
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
                    fill={isHovered ? RED_ACCENT : '#0f172a'}
                    fontSize={isHovered ? '12.5' : '11'}
                    fontWeight="700"
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
                    fill={isHovered ? RED_ACCENT : '#64748b'}
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
        </div>
      </div>
    </div>
  );
};

const RunningTicker = ({
  text,
  direction = 'left',
  speedSeconds = 38,
}: {
  text: string;
  direction?: 'left' | 'right';
  speedSeconds?: number;
}) => {
  const content = `${text}  ·  ${text}  ·  ${text}  ·  ${text}  ·  `;

  return (
    <div
      style={{
        width: '100%',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        display: 'flex',
        userSelect: 'none',
        padding: '0.75rem 0',
      }}
    >
      <div
        style={{
          display: 'flex',
          width: 'max-content',
          animation: `${direction === 'left' ? 'tickerScrollLeft' : 'tickerScrollRight'} ${speedSeconds}s linear infinite`,
          willChange: 'transform',
        }}
      >
        <span
          style={{
            fontSize: 'clamp(0.82rem, 1.05vw, 0.88rem)',
            fontWeight: 500,
            color: '#8392a5',
            letterSpacing: '0.01em',
            paddingRight: '1rem',
          }}
        >
          {content}
        </span>
        <span
          aria-hidden="true"
          style={{
            fontSize: 'clamp(0.82rem, 1.05vw, 0.88rem)',
            fontWeight: 500,
            color: '#8392a5',
            letterSpacing: '0.01em',
            paddingRight: '1rem',
          }}
        >
          {content}
        </span>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0',
    color: '#0f172a',
    boxShadow: '0 32px 80px rgba(0, 0, 0, 0.3)',
    overflow: 'hidden',
    position: 'relative',
  },
  sectionWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '1240px',
    padding: 'clamp(3.5rem, 6vh, 5rem) 2rem',
    userSelect: 'none',
  },
  sectionHeading: {
    color: '#0f172a',
    fontSize: 'clamp(2.1rem, 3.4vw, 2.85rem)',
    fontWeight: 400,
    letterSpacing: '-0.025em',
    marginBottom: 'clamp(2.5rem, 5vh, 4rem)',
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
      <style>{`
        @keyframes tickerScrollLeft {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes tickerScrollRight {
          0% { transform: translate3d(-50%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
      `}</style>

      <RunningTicker
        text="Цифры обновляются раз в неделю, так что данные могут немножко отставать от реальных"
        direction="left"
        speedSeconds={42}
      />

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

            <PleasantRedTrendChart isTriggered={hasStarted} />

            <p style={styles.descriptionText}>
              Забираем максимум звезд на ключевых картах: стабильные 15 на Темном Джео и 36 на Светлом Хоте благодаря дисциплине и точечным приказам офицеров.
            </p>
          </div>
        </div>
      </div>

      <RunningTicker
        text="Лишь за последний месяц мы прибавили больше 25 млн. гм"
        direction="right"
        speedSeconds={36}
      />
    </div>
  );
};

export default StatsCards;
