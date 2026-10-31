import { useEffect, type CSSProperties } from 'react';
import { Lanyard } from './ui/lanyard';

const styles = {
  pageWrapper: {
    width: '100%',
    minHeight: '100dvh',
    backgroundColor: '#070709',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  } satisfies CSSProperties,
  heroSection: {
    position: 'relative',
    width: '100%',
    height: '100dvh',
    minHeight: '640px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundImage: `
      radial-gradient(ellipse 60% 50% at 50% 0%, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.04) 40%, rgba(7, 7, 9, 0) 75%),
      radial-gradient(ellipse 30% 25% at 50% 10%, rgba(255, 255, 255, 0.1) 0%, rgba(7, 7, 9, 0) 100%)
    `,
  } satisfies CSSProperties,
  headerGroup: {
    position: 'absolute',
    top: 'clamp(2.5rem, 6vh, 4.5rem)',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: '0 1.5rem',
    gap: '0.45rem',
    pointerEvents: 'none',
    userSelect: 'none',
  } satisfies CSSProperties,
  title: {
    color: '#ffffff',
    fontSize: 'clamp(1.35rem, 2.4vw, 2.25rem)',
    fontWeight: 700,
    lineHeight: 1.15,
    letterSpacing: '-0.025em',
  } satisfies CSSProperties,
  subtitle: {
    color: '#94a3b8',
    fontSize: 'clamp(1.35rem, 2.4vw, 2.25rem)',
    fontWeight: 700,
    lineHeight: 1.15,
    letterSpacing: '-0.025em',
  } satisfies CSSProperties,
  canvasContainer: {
    position: 'absolute',
    inset: 0,
    zIndex: 1,
  } satisfies CSSProperties,
};

export const App = () => {
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={styles.pageWrapper}>
      <header style={styles.heroSection}>
        <div style={styles.headerGroup}>
          <h1 style={styles.title}>Те, кто в тени</h1>
          <p style={styles.subtitle}>Активно выходят в свет</p>
        </div>

        <div style={styles.canvasContainer}>
          <Lanyard
            cardColor="#8a8f99"
            finish="metallic"
            metal="silver"
            anchor="center"
            size={0.38}
            strapColor="#0a0a0c"
            strapLength={0.48}
            elasticity={0.18}
            damping={0.6}
            intro={true}
            interactive={true}
          />
        </div>
      </header>
    </div>
  );
};
