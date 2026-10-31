import { useEffect, useState, type CSSProperties } from 'react';
import LightRays from './ui/LightRays';
import { Dock } from './ui/dock';

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
    height: '240vh',
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
    gap: '0.35rem',
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
  narrativeWrapper: {
    position: 'absolute',
    top: 'calc(100% + 1.25rem)',
    left: '50%',
    width: 'max-content',
    maxWidth: 'clamp(320px, 46vw, 620px)',
    pointerEvents: 'none',
    userSelect: 'none',
    willChange: 'filter, opacity, transform',
  },
  narrativeText: {
    margin: 0,
    padding: 0,
    color: '#b2b2ba',
    fontSize: 'clamp(0.92rem, 1.15vw, 1.05rem)',
    fontWeight: 400,
    lineHeight: 1.6,
    letterSpacing: '-0.01em',
    textAlign: 'center',
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

    let frameId: number | null = null;
    const onScroll = () => {
      if (frameId !== null) return;
      frameId = requestAnimationFrame(() => {
        const scrollMax = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        const ratio = Math.min(1, Math.max(0, window.scrollY / scrollMax));
        setStageProgress(ratio);
        frameId = null;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frameId !== null) cancelAnimationFrame(frameId);
    };
  }, []);

  const titleShiftY = -stageProgress * 42;
  const descOpacity = Math.min(1, Math.max(0, (stageProgress - 0.04) / 0.45));
  const descBlur = (1 - descOpacity) * 14;
  const descShiftY = (1 - descOpacity) * 18;

  const dockProgress =
    activeSection === 'about'
      ? (1 + stageProgress) / TOTAL_SEGMENTS
      : undefined;

  return (
    <div style={styles.pageWrapper}>
      <Dock
        currentSectionId={activeSection}
        progress={dockProgress}
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

            <div
              style={{
                ...styles.narrativeWrapper,
                opacity: descOpacity,
                filter: `blur(${descBlur}px)`,
                transform: `translate(-50%, ${descShiftY}px)`,
              }}
            >
              <p style={styles.narrativeText}>
                Мы — быстрорастущая лайтовая гильдия без душных рамок и обязаловок, ведь сами это терпеть не можем. Качаем только ключевых персонажей: 90% из них отлично усилят твой склад и гм, а остальные вовсе не сложные. Двусторонняя лояльность, балбесик, а как иначе? Крутые офицеры всегда подскажут и прикроют, чтобы ты кайфовал от игры. Держим высокую планку, но ценим душевность и уважаем твою свободу.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
