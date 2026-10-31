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
  onSelectSection?: (id: string) => void;
  style?: CSSProperties;
}

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
    padding: '0.45rem 0.95rem',
    backgroundColor: 'rgba(18, 18, 22, 0.78)',
    backdropFilter: 'blur(24px) saturate(190%)',
    WebkitBackdropFilter: 'blur(24px) saturate(190%)',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    borderRadius: '20px',
    boxShadow: '0 16px 40px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.12)',
    userSelect: 'none',
  },
  itemButton: {
    background: 'transparent',
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    padding: '0.45rem 0.85rem',
    borderRadius: '12px',
    fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontSize: '0.95rem',
    fontWeight: 500,
    lineHeight: 1,
    letterSpacing: '-0.015em',
    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
  },
  activeItem: {
    color: '#ffffff',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25)',
  },
  completedItem: {
    color: '#ffffff',
    backgroundColor: 'transparent',
    opacity: 0.92,
  },
  pendingItem: {
    color: 'rgba(255, 255, 255, 0.35)',
    backgroundColor: 'transparent',
  },
};

export const Dock = ({ currentSectionId = 'about', onSelectSection, style }: DockProps) => {
  const currentIndex = SECTIONS.findIndex((s) => s.id === currentSectionId);
  const activeIdx = currentIndex === -1 ? 0 : currentIndex;

  return (
    <nav style={{ ...styles.dockContainer, ...style }} aria-label="Навигация разделов">
      {SECTIONS.map((section, index) => {
        const isCompleted = index < activeIdx;
        const isActive = index === activeIdx;
        const isArrowActive = index < activeIdx;

        let itemStyle: CSSProperties = styles.pendingItem;
        if (isActive) itemStyle = styles.activeItem;
        else if (isCompleted) itemStyle = styles.completedItem;

        return (
          <div key={section.id} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <button
              type="button"
              onClick={() => onSelectSection?.(section.id)}
              style={{
                ...styles.itemButton,
                ...itemStyle,
              }}
            >
              {section.label}
            </button>

            {index < SECTIONS.length - 1 && (
              <svg
                width="16"
                height="10"
                viewBox="0 0 16 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  flexShrink: 0,
                  opacity: isArrowActive ? 1 : 0.22,
                  transition: 'opacity 0.3s ease, filter 0.3s ease',
                  filter: isArrowActive ? 'drop-shadow(0 0 6px rgba(255, 255, 255, 0.4))' : 'none',
                }}
                aria-hidden="true"
              >
                <path
                  d="M1 5H14M14 5L9.5 1M14 5L9.5 9"
                  stroke={isArrowActive ? '#ffffff' : 'rgba(255, 255, 255, 0.6)'}
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
  );
};

export default Dock;
