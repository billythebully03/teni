import { useEffect, useState, type CSSProperties } from 'react';
import LightRays from './ui/LightRays';
import { Dock } from './ui/dock';

const styles: Record<string, CSSProperties> = {
  pageWrapper: {
    width: '100%',
    minHeight: '100dvh',
    backgroundColor: '#000000',
    fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  scrollTrack: {
    position: 'relative',
    width: '100%',
    height: '240vh',
  },
  stickyViewport: {
    position: 'sticky',
    top: 0,
    width: '100%',
    height: '100dvh',
    minHeight: '620px',
    backgroundColor: '#000000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  lightLayer: {
    position: 'absolute',
    inset: 0,
    zIndex: 1,
    pointerEvents: 'none',
  },
  contentBlock: {
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '0 1.5rem',
    gap: '0.45rem',
    pointerEvents: 'none',
    userSelect: 'none',
    transition: 'transform 0.1s ease-out',
  },
  headlineText: {
    color: '#ffffff',
    fontSize: 'clamp(1.35rem, 2.2vw, 1.9rem)',
    fontWeight: 400,
    lineHeight: 1.25,
    letterSpacing: '-0.02em',
  },
  narrativeDescription: {
    marginTop: 'clamp(0.85rem, 1.8vh, 1.35rem)',
    maxWidth: 'clamp(320px, 46vw, 560px)',
    color: '#b0b0b8',
    fontSize: 'clamp(0.92rem, 1.2vw, 1.05rem)',
    fontWeight: 400,
    lineHeight: 1.55,
    letterSpacing: '-0.01em',
    willChange: 'filter, opacity, transform',
    transition: 'opacity 0.15s ease-out, filter 0.15s ease-out, transform 0.15s ease-out',
  },
};

export const App = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [stageProgress, setStageProgress] = useState(0);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const onScroll = () => {
      const scrollMax = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const ratio = Math.min(1, Math.max(0, window.scrollY / scrollMax));
      setStageProgress(ratio);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const titleShiftY = -stageProgress * 32;
  const descOpacity = Math.min(1, Math.max(0, (stageProgress - 0.08) / 0.55));
  const descBlur = (1 - descOpacity) * 14;
  const descShiftY = (1 - descOpacity) * 18;

  return (
    <div style={styles.pageWrapper}>
      <Dock
        currentSectionId={activeSection}
        onSelectSection={(id) => setActiveSection(id)}
      />

      <div style={styles.scrollTrack}>
        <div style={styles.stickyViewport}>
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

          <div
            style={{
              ...styles.contentBlock,
              transform: `translateY(${titleShiftY}px)`,
            }}
          >
            <h1 style={styles.headlineText}>Те, кто в тени</h1>
            <p style={styles.headlineText}>Активно выходят в свет</p>

            <p
              style={{
                ...styles.narrativeDescription,
                opacity: descOpacity,
                filter: `blur(${descBlur}px)`,
                transform: `translateY(${descShiftY}px)`,
              }}
            >
              Лайтовая гильдия без душных рамок и обязаловок. Держим высокую планку в своем сегменте, ценим скилл, чувство юмора и свободу каждого. Основаны 05.09.2025.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
