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

const StarChart = ({ isTriggered }: { isTriggered: boolean }) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (active) return;
    if (!isTriggered) return;
    const timer = setTimeout(() => setActive(true), 200);
    return () => clearTimeout(timer);
  }, [isTriggered, active]);

  const tgeoPercent = active ? (15 / 50) * 100 : 0;
  const shothPercent = active ? (36 / 50) * 100 : 0;

  return (
    <div
      style={{
        width: '100%',
        height: '140px',
        display: 'flex',
        alignItems: 'flex-end',
        gap: '0.85rem',
        marginTop: 'clamp(0.85rem, 1.8vh, 1.25rem)',
        userSelect: 'none',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
          paddingBottom: '24px',
          fontSize: '0.75rem',
          fontWeight: 600,
          color: '#94a3b8',
          lineHeight: 1,
          textAlign: 'right',
          width: '46px',
          flexShrink: 0,
        }}
      >
        <span style={{ fontSize: '0.7rem', color: '#64748b' }}>50 ★</span>
        <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>25 ★</span>
        <span style={{ fontSize: '0.7rem', color: '#cbd5e1' }}>0 ★</span>
      </div>

      <div
        style={{
          position: 'relative',
          flex: 1,
          height: '100%',
          borderLeft: '1.5px solid #e2e8f0',
          borderBottom: '1.5px solid #e2e8f0',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-around',
          padding: '0 0.75rem 24px 0.75rem',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            borderTop: '1px dashed #f1f5f9',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: '50%',
            borderTop: '1px dashed #f1f5f9',
          }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100%',
            justifyContent: 'flex-end',
            width: '44px',
            position: 'relative',
          }}
        >
          <span
            style={{
              position: 'absolute',
              bottom: `calc(${tgeoPercent}% + 6px)`,
              fontSize: '0.82rem',
              fontWeight: 700,
              color: '#0f172a',
              transition: 'bottom 1.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            15★
          </span>
          <div
            style={{
              width: '100%',
              height: `${tgeoPercent}%`,
              backgroundColor: '#334155',
              borderRadius: '6px 6px 0 0',
              transition: 'height 1.3s cubic-bezier(0.16, 1, 0.3, 1)',
              willChange: 'height',
            }}
          />
          <span
            style={{
              position: 'absolute',
              bottom: '-22px',
              fontSize: '0.82rem',
              fontWeight: 600,
              color: '#334155',
              whiteSpace: 'nowrap',
            }}
          >
            ТДжео
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100%',
            justifyContent: 'flex-end',
            width: '44px',
            position: 'relative',
          }}
        >
          <span
            style={{
              position: 'absolute',
              bottom: `calc(${shothPercent}% + 6px)`,
              fontSize: '0.82rem',
              fontWeight: 700,
              color: '#0f172a',
              transition: 'bottom 1.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            36★
          </span>
          <div
            style={{
              width: '100%',
              height: `${shothPercent}%`,
              backgroundColor: '#0f172a',
              borderRadius: '6px 6px 0 0',
              transition: 'height 1.3s cubic-bezier(0.16, 1, 0.3, 1)',
              willChange: 'height',
            }}
          />
          <span
            style={{
              position: 'absolute',
              bottom: '-22px',
              fontSize: '0.82rem',
              fontWeight: 600,
              color: '#0f172a',
              whiteSpace: 'nowrap',
            }}
          >
            СХот
          </span>
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, CSSProperties> = {
  whitePanel: {
    width: '100%',
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'clamp(4rem, 8vh, 6.5rem) 1.5rem',
    color: '#0f172a',
    boxShadow: '0 24px 64px rgba(0, 0, 0, 0.25)',
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
    fontSize: 'clamp(2rem, 3.2vw, 2.75rem)',
    fontWeight: 700,
    letterSpacing: '-0.025em',
    marginBottom: 'clamp(2.5rem, 5vh, 4rem)',
    textAlign: 'center',
  },
  statsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    alignItems: 'flex-start',
    gap: 'clamp(2rem, 4vw, 3.5rem)',
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
    fontWeight: 600,
    letterSpacing: '-0.015em',
  },
  counterRow: {
    display: 'flex',
    alignItems: 'baseline',
    color: '#0f172a',
    fontSize: 'clamp(2.4rem, 3.5vw, 3.1rem)',
    fontWeight: 800,
    letterSpacing: '-0.035em',
    lineHeight: 1,
    marginTop: 'clamp(1rem, 2vh, 1.35rem)',
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
    fontWeight: 600,
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
                  strokeWidth="2"
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
                  strokeWidth="2"
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
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span style={styles.headerTitle}>Звёзды за ВИ</span>
            </div>

            <StarChart isTriggered={hasStarted} />

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
