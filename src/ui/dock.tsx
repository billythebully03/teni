import { useEffect, useRef, useState, type CSSProperties } from 'react';

export interface DockSection {
  id: string;
  label: string;
}

const SECTIONS: DockSection[] = [
  { id: 'about', label: 'О нас' },
  { id: 'stats', label: 'Статистика' },
  { id: 'roster', label: 'Наш состав' },
  { id: 'history', label: 'История' },
  { id: 'apply', label: 'Заявка' },
];

export interface DockProps {
  currentSectionId?: string;
  progress?: number;
  onSelectSection?: (id: string) => void;
  onSearchClick?: () => void;
  style?: CSSProperties;
}

const TOTAL_SEGMENTS = SECTIONS.length + (SECTIONS.length - 1);

const calculateFill = (segIndex: number, currentProgress: number): number => {
  const segStart = segIndex / TOTAL_SEGMENTS;
  const segEnd = (segIndex + 1) / TOTAL_SEGMENTS;
  if (currentProgress <= segStart) return 0;
  if (currentProgress >= segEnd) return 100;
  return ((currentProgress - segStart) / (segEnd - segStart)) * 100;
};

const easeInOutCubic = (t: number): number =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const styles: Record<string, CSSProperties> = {
  headerWrapper: {
    position: 'fixed',
    top: 'clamp(1.5rem, 3.5vh, 2.5rem)',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 50,
    display: 'flex',
    alignItems: 'center',
    gap: '0.65rem',
    userSelect: 'none',
  },
  dockContainer: {
    display: 'flex',
    alignItems: 'center',
    height: '46px',
    gap: '0.65rem',
    padding: '0 1rem',
    backgroundColor: 'rgba(14, 14, 18, 0.75)',
    backdropFilter: 'blur(24px) saturate(190%)',
    WebkitBackdropFilter: 'blur(24px) saturate(190%)',
    border: 'none',
    outline: 'none',
    borderRadius: '20px',
    boxShadow: '0 16px 40px rgba(0, 0, 0, 0.45)',
  },
  searchButton: {
    width: '46px',
    height: '46px',
    flexShrink: 0,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(14, 14, 18, 0.75)',
    backdropFilter: 'blur(24px) saturate(190%)',
    WebkitBackdropFilter: 'blur(24px) saturate(190%)',
    border: 'none',
    outline: 'none',
    borderRadius: '50%',
    boxShadow: '0 16px 40px rgba(0, 0, 0, 0.45)',
    cursor: 'pointer',
    padding: 0,
    transition: 'background-color 0.25s ease, transform 0.2s ease',
  },
  itemButton: {
    background: 'transparent',
    backgroundColor: 'transparent',
    border: 'none',
    outline: 'none',
    boxShadow: 'none',
    cursor: 'pointer',
    padding: '0.35rem 0.55rem',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontSize: '0.95rem',
    fontWeight: 500,
    lineHeight: 1,
    letterSpacing: '-0.015em',
  },
  arrowSvg: {
    display: 'block',
    flexShrink: 0,
    overflow: 'visible',
    background: 'none',
    backgroundColor: 'transparent',
  },
};

export const Dock = ({
  currentSectionId = 'about',
  progress,
  onSelectSection,
  onSearchClick,
  style,
}: DockProps) => {
  const currentIndex = SECTIONS.findIndex((s) => s.id === currentSectionId);
  const activeIdx = currentIndex === -1 ? 0 : currentIndex;

  const isExternalProgress = typeof progress === 'number';
  const targetProgress = isExternalProgress
    ? Math.max(0, Math.min(1, progress))
    : (activeIdx * 2 + 1) / TOTAL_SEGMENTS;

  const [displayProgress, setDisplayProgress] = useState(targetProgress);
  const progressRef = useRef(targetProgress);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (isExternalProgress) {
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
      progressRef.current = targetProgress;
      setDisplayProgress(targetProgress);
      return;
    }

    const startVal = progressRef.current;
    const endVal = targetProgress;
    if (Math.abs(startVal - endVal) < 0.001) return;

    const startTime = performance.now();
    const duration = Math.max(280, Math.min(650, Math.abs(endVal - startVal) * 850));

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progressRatio = Math.min(1, elapsed / duration);
      const eased = easeInOutCubic(progressRatio);
      const currentVal = startVal + (endVal - startVal) * eased;

      progressRef.current = currentVal;
      setDisplayProgress(currentVal);

      if (progressRatio < 1) {
        animFrameRef.current = requestAnimationFrame(step);
      } else {
        progressRef.current = endVal;
        setDisplayProgress(endVal);
        animFrameRef.current = null;
      }
    };

    if (animFrameRef.current !== null) {
      cancelAnimationFrame(animFrameRef.current);
    }
    animFrameRef.current = requestAnimationFrame(step);

    return () => {
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [targetProgress, isExternalProgress]);

  return (
    <div style={{ ...styles.headerWrapper, ...style }}>
      <nav style={styles.dockContainer} aria-label="Навигация разделов">
        {SECTIONS.map((section, index) => {
          const itemSegIndex = index * 2;
          const arrowSegIndex = index * 2 + 1;

          const itemFill = calculateFill(itemSegIndex, displayProgress);
          const arrowFill = index < SECTIONS.length - 1 ? calculateFill(arrowSegIndex, displayProgress) : 0;
          const gradId = `dock-arrow-grad-${index}`;

          return (
            <div key={section.id} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <button
                type="button"
                onClick={() => onSelectSection?.(section.id)}
                style={styles.itemButton}
              >
                <span
                  style={{
                    backgroundImage: `linear-gradient(to right, #ffffff ${itemFill}%, rgba(255, 255, 255, 0.32) ${Math.min(100, itemFill + 2)}%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'inline-block',
                  }}
                >
                  {section.label}
                </span>
              </button>

              {index < SECTIONS.length - 1 && (
                <svg
                  width="16"
                  height="10"
                  viewBox="0 0 16 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={styles.arrowSvg}
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset={`${arrowFill}%`} stopColor="#ffffff" />
                      <stop offset={`${arrowFill}%`} stopColor="rgba(255, 255, 255, 0.22)" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M1 5H14M14 5L9.5 1M14 5L9.5 9"
                    stroke={`url(#${gradId})`}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
          );
        })}
      </nav>

      <button
        type="button"
        onClick={onSearchClick}
        aria-label="Поиск"
        style={styles.searchButton}
      >
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle
            cx="11"
            cy="11"
            r="6.5"
            stroke="rgba(255, 255, 255, 0.65)"
            strokeWidth="1.8"
          />
          <path
            d="M16 16L21 21"
            stroke="rgba(255, 255, 255, 0.65)"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default Dock;
