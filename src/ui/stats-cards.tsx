import { useEffect, useState, type CSSProperties } from 'react';

export interface StatsCardsProps {
  activeCardIndex: number;
  highlightIntensity: number;
  isTriggered: boolean;
  onCardClick?: (index: number) => void;
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
  container: {
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'center',
    gap: 'clamp(1rem, 2vw, 1.5rem)',
    width: '100%',
    maxWidth: '1080px',
    padding: '0 1.5rem',
    userSelect: 'none',
  },
  cardBase: {
    position: 'relative',
    flex: '1 1 0',
    minWidth: '240px',
    maxWidth: '340px',
    height: 'clamp(380px, 46vh, 440px)',
    borderRadius: '24px',
    backgroundColor: '#0c0c0f',
    padding: 'clamp(1.5rem, 2.5vw, 2rem)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    overflow: 'hidden',
    transition: 'border-color 0.35s ease, box-shadow 0.35s ease, transform 0.35s ease',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.65rem',
  },
  cardTitle: {
    color: '#ffffff',
    fontSize: '1.2rem',
    fontWeight: 600,
    letterSpacing: '-0.015em',
  },
  counterRow: {
    display: 'flex',
    alignItems: 'baseline',
    color: '#ffffff',
    fontSize: 'clamp(2.2rem, 3.2vw, 2.75rem)',
    fontWeight: 700,
    letterSpacing: '-0.03em',
    lineHeight: 1,
    marginTop: 'clamp(1.2rem, 2vh, 1.6rem)',
  },
  counterSuffix: {
    marginLeft: '0.45rem',
    fontSize: 'clamp(1rem, 1.4vw, 1.2rem)',
    fontWeight: 500,
    color: 'rgba(255, 255, 255, 0.45)',
    letterSpacing: '-0.01em',
  },
  descriptionText: {
    marginTop: 'clamp(0.75rem, 1.5vh, 1rem)',
    color: '#8e8e96',
    fontSize: '0.92rem',
    lineHeight: 1.55,
    letterSpacing: '-0.01em',
  },
  bottomActionText: {
    fontSize: '0.85rem',
    fontWeight: 500,
    color: 'rgba(255, 255, 255, 0.45)',
    letterSpacing: '-0.01em',
    cursor: 'pointer',
    transition: 'color 0.25s ease',
  },
  patternOverlay: {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.14) 1px, transparent 1px)',
    backgroundSize: '9px 9px',
    opacity: 0,
    transition: 'opacity 0.4s ease',
  },
};

export const StatsCards = ({
  activeCardIndex,
  highlightIntensity,
  isTriggered,
  onCardClick,
  style,
}: StatsCardsProps) => {
  return (
    <div style={{ ...styles.container, ...style }}>
      {[0, 1, 2].map((idx) => {
        const isCurrentActive = activeCardIndex === idx;
        const currentIntensity = isCurrentActive ? highlightIntensity : 0;

        const borderColor =
          currentIntensity > 0.05
            ? `rgba(255, 255, 255, ${0.12 + 0.3 * currentIntensity})`
            : 'rgba(255, 255, 255, 0.08)';

        const boxShadow =
          currentIntensity > 0.05
            ? `0 24px 48px rgba(0, 0, 0, 0.7), inset 0 0 28px rgba(255, 255, 255, ${0.05 * currentIntensity})`
            : '0 12px 32px rgba(0, 0, 0, 0.4)';

        return (
          <div
            key={idx}
            style={{
              ...styles.cardBase,
              border: `1px solid ${borderColor}`,
              boxShadow,
              transform: currentIntensity > 0.1 ? 'translateY(-4px)' : 'translateY(0)',
            }}
          >
            <div
              style={{
                ...styles.patternOverlay,
                opacity: currentIntensity > 0.1 ? currentIntensity * 0.9 : 0,
              }}
            />

            {idx === 0 ? (
              <>
                <div>
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
                        d="M12 2L14.4 7.6L20 8.4L16 12.8L17 18.5L12 15.6L7 18.5L8 12.8L4 8.4L9.6 7.6L12 2Z"
                        stroke="#ffffff"
                        strokeWidth="1.8"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span style={styles.cardTitle}>Циферки</span>
                  </div>

                  <div style={styles.counterRow}>
                    <DigitReel targetDigit={3} delayMs={100} isTriggered={isTriggered} />
                    <DigitReel targetDigit={0} delayMs={260} isTriggered={isTriggered} />
                    <DigitReel targetDigit={0} delayMs={420} isTriggered={isTriggered} />
                    <span style={styles.counterSuffix}>млн гм</span>
                  </div>

                  <p style={styles.descriptionText}>
                    Растем и развиваемся с каждым днем, уверенно расширяя влияние и поднимая планку гильдии.
                  </p>
                </div>

                <div>
                  <span
                    onClick={() => onCardClick?.(0)}
                    style={styles.bottomActionText}
                  >
                    Нажми по мне
                  </span>
                </div>
              </>
            ) : (
              <div style={{ display: 'flex', flex: 1, alignItems: 'flex-end' }}>
                <span style={{ ...styles.bottomActionText, opacity: 0.25 }}>
                  Скоро здесь появится блок
                </span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;
