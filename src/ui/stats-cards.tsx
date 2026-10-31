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

const styles: Record<string, CSSProperties> = {
  sectionWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '1040px',
    padding: '0 2rem',
    userSelect: 'none',
  },
  sectionHeading: {
    color: '#ffffff',
    fontSize: 'clamp(1.75rem, 2.5vw, 2.25rem)',
    fontWeight: 500,
    letterSpacing: '-0.02em',
    marginBottom: 'clamp(2rem, 4vh, 3rem)',
    textAlign: 'center',
  },
  statsRow: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: 'clamp(2.5rem, 6vw, 5rem)',
    width: '100%',
  },
  statColumn: {
    flex: '1 1 0',
    maxWidth: '440px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  headerRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: '1.25rem',
    fontWeight: 400,
    letterSpacing: '-0.015em',
  },
  counterRow: {
    display: 'flex',
    alignItems: 'baseline',
    color: '#ffffff',
    fontSize: 'clamp(2.5rem, 3.8vw, 3.25rem)',
    fontWeight: 700,
    letterSpacing: '-0.03em',
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
    marginLeft: '0.5rem',
    fontSize: 'clamp(1.05rem, 1.5vw, 1.25rem)',
    fontWeight: 500,
    color: 'rgba(255, 255, 255, 0.55)',
    letterSpacing: '-0.01em',
    lineHeight: 1,
    alignSelf: 'baseline',
  },
  descriptionText: {
    marginTop: 'clamp(0.85rem, 1.8vh, 1.25rem)',
    color: '#a0a0aa',
    fontSize: 'clamp(0.92rem, 1.15vw, 1rem)',
    lineHeight: 1.65,
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
                stroke="#ffffff"
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
                stroke="#ffffff"
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
      </div>
    </div>
  );
};

export default StatsCards;
