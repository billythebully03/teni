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
    gap: '0.45rem',
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
  narrativeContainer: {
    marginTop: 'clamp(1.2rem, 2.4vh, 1.8rem)',
    maxWidth: 'clamp(340px, 50vw, 660px)',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.9rem',
    willChange: 'filter, opacity, transform',
    transition: 'opacity 0.15s ease-out, filter 0.15s ease-out, transform 0.15s ease-out',
  },
  narrativeParagraph: {
    color: '#b2b2ba',
    fontSize: 'clamp(0.92rem, 1.15vw, 1.05rem)',
    fontWeight: 400,
    lineHeight: 1.6,
    letterSpacing: '-0.01em',
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

  const titleShiftY = -stageProgress * 36;
  const descOpacity = Math.min(1, Math.max(0, (stageProgress - 0.05) / 0.5));
  const descBlur = (1 - descOpacity) * 14;
  const descShiftY = (1 - descOpacity) * 20;

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
                ...styles.narrativeContainer,
                opacity: descOpacity,
                filter: `blur(${descBlur}px)`,
                transform: `translateY(${descShiftY}px)`,
              }}
            >
              <p style={styles.narrativeParagraph}>
                Мы — быстрорастущая лайтовая гильдия без душных обязаловок и загона участников в рамки, ведь сами терпеть это не можем! Вместо этого подход к требованиям у нас трижды прекрасен! Мы просим качать только обязательных для роста гильдии персонажей, 90% из которых хорошо поднимут твой склад и гм, а те 10%, которые этого не сделают — вовсе не сложные. Да-да, балбесик, у нас тут двусторонняя лояльность, а как же еще?
              </p>
              <p style={styles.narrativeParagraph}>
                А еще наши крутые ребятки-офицеры помогут с любым вопросом и проследят, чтобы ты кайфовал от пребывания в нашей общине!
              </p>
              <p style={styles.narrativeParagraph}>
                Проще говоря, мы не только держим высокую планку в своем сегменте, но и ценим душевность и уважаем твою свободу.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
