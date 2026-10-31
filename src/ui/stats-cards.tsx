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

interface TooltipState {
  title: string;
  subtitle: string;
  x: number;
  y: number;
}

const TrendChart = ({ isTriggered }: { isTriggered: boolean }) => {
  const [active, setActive] = useState(false);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

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
              onMouseEnter={() =>
                setTooltip({
                  title: '15★ звезд',
                  subtitle: 'ТДжео (Темный Джео)',
                  x: (p1.x / 320) * 100,
                  y: (p1.y / 150) * 100,
                })
              }
              onMouseLeave={() => setTooltip(null)}
              style={{ cursor: 'pointer' }}
            >
              <circle cx={p1.x} cy={p1.y} r="18" fill="transparent" />
              <circle
                cx={p1.x}
                cy={p1.y}
                r="6"
                fill="#0f172a"
                fillOpacity="0.15"
                style={{
                  transform: active ? 'scale(1)' : 'scale(0)',
                  transformOrigin: `${p1.x}px ${p1.y}px`,
                  transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.6s',
                }}
              />
              <circle
                cx={p1.x}
                cy={p1.y}
                r="3.5"
                fill="#0f172a"
                style={{
                  transform: active ? 'scale(1)' : 'scale(0)',
                  transformOrigin: `${p1.x}px ${p1.y}px`,
                  transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.6s',
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
                fill="#64748b"
                fontSize="11.5"
                fontWeight="500"
              >
                ТДжео
              </text>
            </g>

            <g
              onMouseEnter={() =>
                setTooltip({
                  title: '36★ звезд',
                  subtitle: 'СХот (Светлый Хот)',
                  x: (p2.x / 320) * 100,
                  y: (p2.y / 150) * 100,
                })
              }
              onMouseLeave={() => setTooltip(null)}
              style={{ cursor: 'pointer' }}
            >
              <circle cx={p2.x} cy={p2.y} r="18" fill="transparent" />
              <circle
                cx={p2.x}
                cy={p2.y}
                r="6"
                fill="#0f172a"
                fillOpacity="0.15"
                style={{
                  transform: active ? 'scale(1)' : 'scale(0)',
                  transformOrigin: `${p2.x}px ${p2.y}px`,
                  transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) 1s',
                }}
              />
              <circle
                cx={p2.x}
                cy={p2.y}
                r="3.5"
                fill="#0f172a"
                style={{
                  transform: active ? 'scale(1)' : 'scale(0)',
                  transformOrigin: `${p2.x}px ${p2.y}px`,
                  transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1) 1s',
                }}
              />
              <text
                x={p2.x}
                y={p2.y - 12}
                textAnchor="middle"
                fill="#0f172a"
                fontSize="11"
                fontWeight="700"
                style={{
                  opacity: active ? 1 : 0,
                  transition: 'opacity 0.4s ease 1.1s',
                }}
              >
                36★
              </text>
              <text
                x={p2.x}
                y="142"
                textAnchor="middle"
                fill="#64748b"
                fontSize="11.5"
                fontWeight="500"
              >
                СХот
              </text>
            </g>
          </svg>

          {tooltip && (
            <div
              style={{
                position: 'absolute',
                left: `${tooltip.x}%`,
                top: `${tooltip.y}%`,
                transform: 'translate(-50%, -125%)',
                backgroundColor: '#0f172a',
                color: '#ffffff',
                padding: '6px 12px',
                borderRadius: '8px',
                boxShadow: '0 8px 24px rgba(15, 23, 42, 0.28)',
                pointerEvents: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                whiteSpace: 'nowrap',
                zIndex: 10,
              }}
            >
              <span style={{ fontSize: '0.8rem', fontWeight: 700, lineHeight: 1.15 }}>
                {tooltip.title}
              </span>
              <span style={{ fontSize: '0.68rem', color: '#94a3b8', marginTop: '2px' }}>
                {tooltip.subtitle}
              </span>
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
    padding: 'clamp(5.5rem, 11vh, 8.5rem) 2rem',
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
        <h2 style={styles.sectionHeading}>Циферки</h2>

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

            <TrendChart isTriggered={hasStarted} />

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
