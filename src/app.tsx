import { useEffect, useState, type CSSProperties } from 'react';
import LightRays from './ui/LightRays';
import { Dock } from './ui/dock';
import { StatsCards } from './ui/stats-cards';

const TOTAL_SEGMENTS = 9;

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
    height: '460vh',
  },
  stickyViewport: {
    position: 'sticky',
    top: 0,
    width: '100%',
    height: '100dvh',
    minHeight: '640px',
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
    willChange: 'transform',
  },
  aboutStage: {
    position: 'absolute',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '0 1.5rem',
    pointerEvents: 'none',
    userSelect: 'none',
    willChange: 'transform',
  },
  headlineText: {
    color: '#ffffff',
    fontSize: 'clamp(1.35rem, 2.2vw, 1.9rem)',
    fontWeight: 400,
    lineHeight: 1.25,
    letterSpacing: '-0.02em',
  },
  narrativeText: {
    margin: '1.25rem 0 0 0',
    padding: 0,
    maxWidth: 'clamp(320px, 46vw, 620px)',
    color: '#b2b2ba',
    fontSize: 'clamp(0.92rem, 1.15vw, 1.05rem)',
    fontWeight: 400,
    lineHeight: 1.6,
    letterSpacing: '-0.01em',
    textAlign: 'center',
    willChange: 'opacity, filter',
  },
  statsStage: {
    position: 'absolute',
    zIndex: 3,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    willChange: 'transform',
  },
};

export const App = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [scrollRatio, setScrollRatio] = useState(0);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    let frameId: number | null = null;
    const onScroll = () => {
      if (frameId !== null) return;
      frameId = requestAnimationFrame(() => {
        const scrollMax = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        const ratio = Math.min(1, Math.max(0, window.scrollY / scrollMax));
        setScrollRatio(ratio);
        frameId = null;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frameId !== null) cancelAnimationFrame(frameId);
    };
  }, []);

  const aboutReveal = Math.min(1, Math.max(0, scrollRatio / 0.18));
  const aboutCenterOffset = (1 - aboutReveal) * 58;
  const descOpacity = Math.min(1, Math.max(0, (aboutReveal - 0.15) / 0.85));
  const descBlur = (1 - descOpacity) * 14;

  const scrollTransition = Math.min(1, Math.max(0, (scrollRatio - 0.28) / 0.2));

  const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
  const naturalScrollUpDistance = viewportHeight * 1.05;

  const aboutStageY = aboutCenterOffset - scrollTransition * naturalScrollUpDistance;
  const lightLayerY = -scrollTransition * naturalScrollUpDistance;
  const statsStageY = (1 - scrollTransition) * naturalScrollUpDistance;

  const statsArrived = scrollTransition >= 0.98;
  const statsActive = scrollRatio >= 0.38;

  useEffect(() => {
    if (scrollRatio >= 0.48 && activeSection !== 'stats') {
      setActiveSection('stats');
    } else if (scrollRatio < 0.48 && activeSection !== 'about') {
      setActiveSection('about');
    }
  }, [scrollRatio, activeSection]);

  let dockProgress: number;
  if (scrollRatio < 0.25) {
    const p = Math.min(1, scrollRatio / 0.25);
    dockProgress = (1 + p) / TOTAL_SEGMENTS;
  } else if (scrollRatio < 0.5) {
    const p = Math.min(1, (scrollRatio - 0.25) / 0.25);
    dockProgress = (2 + p) / TOTAL_SEGMENTS;
  } else {
    const p = Math.min(1, (scrollRatio - 0.5) / 0.5);
    dockProgress = (3 + p) / TOTAL_SEGMENTS;
  }

  return (
    <div style={styles.pageWrapper}>
      <Dock
        currentSectionId={activeSection}
        progress={dockProgress}
        onSelectSection={(id) => setActiveSection(id)}
      />

      <div style={styles.scrollTrack}>
        <div style={styles.stickyViewport}>
          <div
            style={{
              ...styles.lightLayer,
              transform: `translate3d(0, ${lightLayerY}px, 0)`,
            }}
          >
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
              ...styles.aboutStage,
              transform: `translate3d(0, ${aboutStageY}px, 0)`,
              pointerEvents: scrollTransition < 0.5 ? 'auto' : 'none',
            }}
          >
            <h1 style={styles.headlineText}>Те, кто в тени</h1>
            <p style={styles.headlineText}>Активно выходят в свет</p>

            <p
              style={{
                ...styles.narrativeText,
                opacity: descOpacity,
                filter: `blur(${descBlur}px)`,
              }}
            >
              Мы — быстрорастущая лайтовая гильдия без душных рамок и обязаловок, ведь сами это терпеть не можем. Качаем только ключевых персонажей: 90% из них отлично усилят твой склад и гм, а остальные вовсе не сложные. Двусторонняя лояльность, балбесик, а как иначе? Крутые офицеры всегда подскажут и прикроют, чтобы ты кайфовал от игры. Держим высокую планку, но ценим душевность и уважаем твою свободу.
            </p>
          </div>

          <div
            style={{
              ...styles.statsStage,
              transform: `translate3d(0, ${statsStageY}px, 0)`,
              pointerEvents: statsArrived ? 'auto' : 'none',
            }}
          >
            <StatsCards isTriggered={statsActive} />
          </div>
        </div>
      </div>
    </div>
  );
};
