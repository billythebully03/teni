import type { CSSProperties } from 'react';
import { Lanyard } from './ui/lanyard';

const styles = {
  container: {
    position: 'relative',
    width: '100vw',
    height: '100dvh',
    overflow: 'hidden',
    backgroundColor: '#070709',
    backgroundImage: `
      radial-gradient(ellipse 70% 55% at 50% 0%, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.04) 40%, rgba(7, 7, 9, 0) 75%),
      radial-gradient(ellipse 30% 25% at 50% 12%, rgba(255, 255, 255, 0.08) 0%, rgba(7, 7, 9, 0) 100%)
    `,
  } satisfies CSSProperties,
  canvasLayer: {
    position: 'absolute',
    inset: 0,
    zIndex: 1,
  } satisfies CSSProperties,
  overlayGrid: {
    position: 'absolute',
    inset: 0,
    zIndex: 2,
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 0.9fr)',
    padding: 'clamp(2rem, 5vw, 5rem)',
    pointerEvents: 'none',
  } satisfies CSSProperties,
  leftSection: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    maxWidth: '42rem',
    gap: 'clamp(0.75rem, 1.5vh, 1.25rem)',
  } satisfies CSSProperties,
  primaryHeading: {
    color: '#ffffff',
    fontSize: 'clamp(2.5rem, 4.5vw, 5rem)',
    fontWeight: 800,
    lineHeight: 1.05,
    letterSpacing: '-0.035em',
    userSelect: 'none',
  } satisfies CSSProperties,
  secondaryHeading: {
    color: '#e2e8f0',
    fontSize: 'clamp(2.5rem, 4.5vw, 5rem)',
    fontWeight: 800,
    lineHeight: 1.05,
    letterSpacing: '-0.035em',
    userSelect: 'none',
  } satisfies CSSProperties,
  rightSection: {
    display: 'block',
  } satisfies CSSProperties,
};

export const App = () => {
  return (
    <main style={styles.container}>
      <div style={styles.canvasLayer}>
        <Lanyard
          cardColor="#8a8f99"
          finish="metallic"
          metal="silver"
          anchor="center"
          size={0.4}
          strapColor="#0a0a0c"
          strapLength={0.46}
          elasticity={0.18}
          damping={0.6}
          intro={true}
          interactive={true}
        />
      </div>

      <div style={styles.overlayGrid}>
        <section style={styles.leftSection}>
          <h1 style={styles.primaryHeading}>Те, кто в тени</h1>
          <h2 style={styles.secondaryHeading}>Ведем набор в гильдию</h2>
        </section>
        <section style={styles.rightSection} aria-hidden="true" />
      </div>
    </main>
  );
};
