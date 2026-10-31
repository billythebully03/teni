import { type CSSProperties } from 'react';

export interface DockSection {
  id: string;
  label: string;
}

const SECTIONS: DockSection[] = [
  { id: 'about', label: 'О нас' },
  { id: 'stats', label: 'Статистика' },
  { id: 'history', label: 'История' },
  { id: 'apply', label: 'Заявка' },
];

export interface DockProps {
  currentSectionId?: string;
  onSelectSection?: (id: string) => void;
  style?: CSSProperties;
}

const styles = {
  dockContainer: {
    position: 'fixed',
    bottom: 'clamp(1.25rem, 3.5vh, 2.5rem)',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 50,
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    padding: '0.35rem 0.65rem',
    backgroundColor: 'rgba(22, 22, 26, 0.72)',
    backdropFilter: 'blur(20px) saturate(180%)',
    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    boxShadow: '0 12px 36px rgba(0, 0, 0, 0.55), 0 1px 2px rgba(255, 255, 255, 0.06)',
    userSelect: 'none',
  } satisfies CSSProperties,
  itemButton: {
    background: 'transparent',
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    padding: '0.4rem 0.65rem',
    fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontSize: '0.85rem',
    lineHeight: 1,
    letterSpacing: '-0.01em',
    transition: 'color 0.25s ease, opacity 0.25s ease',
  } satisfies CSSProperties,
  activeItem: {
    color: '#ffffff',
    fontWeight: 500,
    opacity: 1,
  } satisfies CSSProperties,
  idleItem: {
    color: '#ffffff',
    fontWeight: 400,
    opacity: 0.38,
  } satisfies CSSProperties,
  connectorTrack: {
    width: '14px',
    height: '2px',
    borderRadius: '9999px',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    flexShrink: 0,
    transition: 'background-color 0.25s ease',
  } satisfies CSSProperties,
  activeConnectorTrack: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  } satisfies CSSProperties,
};

export const Dock = ({ currentSectionId = 'about', onSelectSection, style }: DockProps) => {
  const currentIndex = SECTIONS.findIndex((s) => s.id === currentSectionId);
  const activeIdx = currentIndex === -1 ? 0 : currentIndex;

  return (
    <nav style={{ ...styles.dockContainer, ...style }} aria-label="Навигация разделов">
      {SECTIONS.map((section, index) => {
        const isCompletedOrActive = index <= activeIdx;
        const isItemActive = index === activeIdx;

        return (
          <div key={section.id} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <button
              type="button"
              onClick={() => onSelectSection?.(section.id)}
              style={{
                ...styles.itemButton,
                ...(isItemActive ? styles.activeItem : styles.idleItem),
              }}
            >
              {section.label}
            </button>
            {index < SECTIONS.length - 1 && (
              <span
                style={{
                  ...styles.connectorTrack,
                  ...(isCompletedOrActive && index < activeIdx ? styles.activeConnectorTrack : {}),
                }}
                aria-hidden="true"
              />
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default Dock;
