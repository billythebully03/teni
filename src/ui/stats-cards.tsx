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
    if (!isTriggered) {
      setActive(false);
      return;
    }
    const timer = setTimeout(() => setActive(true), delayMs);
    return () => clearTimeout(timer);
  }, [isTriggered, delayMs]);

  const digitHeight = 44;
  const targetIndex = DIGITS.lastIndexOf(targetDigit);
  const translateY = active ? -targetIndex * digitHeight : 0;

  return (
    <div
      style={{
        display: 'inline-block',
        height: `${digitHeight}px`,
        overflow: 'hidden',
        verticalAlign: 'top',
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
    maxWidth: '1120px',
    padding: '0 1.5rem',
    userSelect: 'none',
  },
  sectionHeading: {
    color: '#ffffff',
    fontSize: 'clamp(1.75rem, 2.5vw, 2.25rem)',
    fontWeight: 500,
    letterSpacing: '-0.02em',
    marginBottom: 'clamp(1.5rem, 2.8vh, 2.2rem)',
    textAlign: 'center',
  },
  cardsContainer: {
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'center',
    gap: 'clamp(1rem, 2vw, 1.5rem)',
    width: '100%',
  },
  cardBase: {
    position: 'relative',
    flex: '1 1 0',
    minWidth: '240px',
    maxWidth: '350px',
    height: 'clamp(390px, 48vh, 460px)',
    borderRadius: '24px',
    backgroundColor: '#15151c',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    padding: 'clamp(1.5rem, 2.4vw, 2rem)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    overflow: 'hidden',
    boxShadow: '0 18px 40px rgba(0, 0, 0, 0.65)',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.65rem',
    zIndex: 2,
  },
  cardTitle: {
    color: '#ffffff',
    fontSize: '1.2rem',
    fontWeight: 400,
    letterSpacing: '-0.015em',
  },
  counterRow: {
    display: 'flex',
    alignItems: 'center',
    color: '#ffffff',
    fontSize: 'clamp(2.2rem, 3.2vw, 2.75rem)',
    fontWeight: 700,
    letterSpacing: '-0.03em',
    lineHeight: 1,
    marginTop: 'clamp(1.2rem, 2vh, 1.6rem)',
    zIndex: 2,
  },
  revaAvatar: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    objectFit: 'cover',
    marginRight: '0.65rem',
    flexShrink: 0,
    border: '1px solid rgba(255, 255, 255, 0.18)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
  },
  counterSuffix: {
    marginLeft: '0.45rem',
    fontSize: 'clamp(1rem, 1.4vw, 1.2rem)',
    fontWeight: 500,
    color: 'rgba(255, 255, 255, 0.55)',
    letterSpacing: '-0.01em',
  },
  descriptionText: {
    marginTop: 'clamp(0.85rem, 1.6vh, 1.15rem)',
    color: '#9e9ea8',
    fontSize: '0.92rem',
    lineHeight: 1.6,
    letterSpacing: '-0.01em',
    zIndex: 2,
  },
  patternOverlay: {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.28) 1.2px, transparent 1.2px)',
    backgroundSize: '10px 10px',
    WebkitMaskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.08) 0%, rgba(0, 0, 0, 0.35) 40%, rgba(0, 0, 0, 0.95) 100%)',
    maskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.08) 0%, rgba(0, 0, 0, 0.35) 40%, rgba(0, 0, 0, 0.95) 100%)',
    opacity: 0.85,
    zIndex: 1,
  },
};

export const StatsCards = ({ isTriggered, style }: StatsCardsProps) => {
  return (
    <div style={{ ...styles.sectionWrapper, ...style }}>
      <h2 style={styles.sectionHeading}>Циферки</h2>

      <div style={styles.cardsContainer}>
        <div style={styles.cardBase}>
          <div style={styles.patternOverlay} />

          <div style={styles.cardHeader}>
            <svg
              width="20"
              height="20"
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
            <span style={styles.cardTitle}>Наша мощь</span>
          </div>

          <div style={styles.counterRow}>
            <DigitReel targetDigit={3} delayMs={100} isTriggered={isTriggered} />
            <DigitReel targetDigit={0} delayMs={240} isTriggered={isTriggered} />
            <DigitReel targetDigit={0} delayMs={380} isTriggered={isTriggered} />
            <span style={styles.counterSuffix}>млн гм</span>
          </div>

          <p style={styles.descriptionText}>
            Уверенно растем и наращиваем суммарную мощь без лишней нервотрепки и духоты. Каждый участник развивает свой склад с умом, получая максимум отдачи, пока гильдия стабильно держит высокую планку в своем сегменте.
          </p>
        </div>

        <div style={styles.cardBase}>
          <div style={styles.patternOverlay} />

          <div style={styles.cardHeader}>
            <svg
              width="20"
              height="20"
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
            <span style={styles.cardTitle}>Что по фарму</span>
          </div>

          <div style={styles.counterRow}>
            <img src="/reva.png" alt="Рева" style={styles.revaAvatar} />
            <DigitReel targetDigit={3} delayMs={150} isTriggered={isTriggered} />
            <DigitReel targetDigit={5} delayMs={300} isTriggered={isTriggered} />
            <span style={styles.counterSuffix}>осколков</span>
          </div>

          <p style={styles.descriptionText}>
            Меньше чем за год с нуля вышли на стабильный фарм Ревы. За одну ВИ забираем в среднем 35 осколков — четкие офицерские гайды, правильные модули и слаженность состава превращают сложные битвы в понятную рутину.
          </p>
        </div>

        <div style={styles.cardBase}>
          <div style={styles.patternOverlay} />

          <div style={{ display: 'flex', flex: 1, alignItems: 'flex-end', zIndex: 2 }}>
            <span style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.3)' }}>
              Скоро здесь появится блок
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;
