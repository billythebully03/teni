import type { CSSProperties } from 'react';

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

const styles: Record<string, CSSProperties> = {
  dockContainer: {
    position: 'fixed',
    top: 'clamp(1.5rem, 3.5vh, 2.5rem)',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 50,
    display: 'flex',
    alignItems: 'center',
    gap: '0.65rem',
    padding: '0.5rem 1rem',
    backgroundColor: 'rgba(14, 14, 18, 0.75)',
    backdropFilter: 'blur(24px) saturate(190%)',
    WebkitBackdropFilter: 'blur(24px) saturate(190%)',
    border: 'none',
    outline: 'none',
    borderRadius: '20px',
    boxShadow: '0 16px 40px rgba(0, 0, 0, 0.45)',
    userSelect: 'none',
  },
  itemButton: {
    background: 'transparent',
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    padding: '0.35rem 0.55rem',
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontSize: '0.95rem',
    fontWeight: 500,
    lineHeight: 1,
    letterSpacing: '-0.015em',
  },
  textBase: {
    color: 'rgba(255, 255, 255, 0.32)',
    transition: 'color 0.25s ease',
  },
  textFill: {
    position: 'absolute',
    inset: '0.35rem 0.55rem',
    color: '#ffffff',
    whiteSpace: 'nowrap',
    pointerEvents: 'none',
    userSelect: 'none',
    transition: 'clip-path 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
  },
  arrowWrapper: {
    position: 'relative',
    width: '16px',
    height: '10px',
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowBase: {
    position: 'absolute',
    inset: 0,
    display: 'block',
  },
  arrowFill: {
    position: 'absolute',
    inset: 0,
    display: 'block',
    transition: 'clip-path 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
  },
};

export const Dock = ({ currentSectionId = 'about', progress, onSelectSection, style }: DockProps) => {
  const currentIndex = SECTIONS.findIndex((s) => s.id === currentSectionId);
  const activeIdx = currentIndex === -1 ? 0 : currentIndex;

  const effectiveProgress =
    typeof progress === 'number'
      ? Math.max(0, Math.min(1, progress))
      : (activeIdx * 2 + 1) / TOTAL_SEGMENTS;

  return (
    <nav style={{ ...styles.dockContainer, ...style }} aria-label="Навигация разделов">
      {SECTIONS.map((section, index) => {
        const itemSegIndex = index * 2;
        const arrowSegIndex = index * 2 + 1;

        const itemFill = calculateFill(itemSegIndex, effectiveProgress);
        const arrowFill = index < SECTIONS.length - 1 ? calculateFill(arrowSegIndex, effectiveProgress) : 0;

        return (
          <div key={section.id} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <button
              type="button"
              onClick={() => onSelectSection?.(section.id)}
              style={styles.itemButton}
            >
              <span style={styles.textBase}>{section.label}</span>
              <span
                aria-hidden="true"
                style={{
                  ...styles.textFill,
                  clipPath: `inset(0 ${100 - itemFill}% 0 0)`,
                }}
              >
                {section.label}
              </span>
            </button>

            {index < SECTIONS.length - 1 && (
              <div style={styles.arrowWrapper} aria-hidden="true">
                <svg
                  width="16"
                  height="10"
                  viewBox="0 0 16 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={styles.arrowBase}
                >
                  <path
                    d="M1 5H14M14 5L9.5 1M14 5L9.5 9"
                    stroke="rgba(255, 255, 255, 0.22)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <div
                  style={{
                    ...styles.arrowFill,
                    clipPath: `inset(0 ${100 - arrowFill}% 0 0)`,
                  }}
                >
                  <svg
                    width="16"
                    height="10"
                    viewBox="0 0 16 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      display: 'block',
                      filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.6))',
                    }}
                  >
                    <path
                      d="M1 5H14M14 5L9.5 1M14 5L9.5 9"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default Dock;
