import { useEffect, useState, type CSSProperties } from 'react';
import LightRays from './ui/LightRays';
import { Dock } from './ui/dock';

const styles = {
  pageWrapper: {
    width: '100%',
    minHeight: '100dvh',
    backgroundColor: '#000000',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  } satisfies CSSProperties,
  heroSection: {
    position: 'relative',
    width: '100%',
    height: '100dvh',
    minHeight: '620px',
    backgroundColor: '#000000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  } satisfies CSSProperties,
  lightLayer: {
    position: 'absolute',
    inset: 0,
    zIndex: 1,
    pointerEvents: 'none',
  } satisfies CSSProperties,
  contentBlock: {
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '0 1.5rem',
    gap: '0.35rem',
    pointerEvents: 'none',
    userSelect: 'none',
  } satisfies CSSProperties,
  headlineText: {
    color: '#ffffff',
    fontSize: 'clamp(1.35rem, 2.2vw, 1.9rem)',
    fontWeight: 400,
    lineHeight: 1.25,
    letterSpacing: '-0.02em',
  } satisfies CSSProperties,
};

export const App = () => {
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={styles.pageWrapper}>
      <header style={styles.heroSection}>
        <div style={styles.lightLayer}>
          <LightRays
            raysOrigin="top-center"
            raysColor="#ffffff"
            raysSpeed={1}
            lightSpread={0.5}
            rayLength={3}
            glow={0.6}
            haze={0.25}
            followMouse
            mouseInfluence={0.1}
            rayDensity={1}
            tilt={0}
            raySharpness={0.35}
            atmosphere={1}
            intensity={1}
            fadeDistance={1}
            saturation={1}
            noiseAmount={0}
            distortion={0}
            pulsating={false}
            cursorShadow
            clickPulse
            intro
            lightMode={false}
          />
        </div>

        <div style={styles.contentBlock}>
          <h1 style={styles.headlineText}>Те, кто в тени</h1>
          <p style={styles.headlineText}>Активно выходят в свет</p>
        </div>
      </header>

      <Dock
        currentSectionId={activeSection}
        onSelectSection={(id) => setActiveSection(id)}
      />
    </div>
  );
};
