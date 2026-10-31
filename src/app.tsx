.viewport {
  position: relative;
  width: 100vw;
  height: 100dvh;
  overflow: hidden;
  background-color: #060608;
  background-image:
    radial-gradient(
      ellipse 60% 55% at 50% -5%,
      rgba(255, 255, 255, 0.18) 0%,
      rgba(255, 255, 255, 0.05) 40%,
      rgba(255, 255, 255, 0) 75%
    ),
    radial-gradient(
      circle 500px at 50% 30%,
      rgba(255, 255, 255, 0.035) 0%,
      rgba(255, 255, 255, 0) 70%
    );
}

.lanyard-layer {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.layout-grid {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr 1fr;
  pointer-events: none;
}

.hero-column {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: clamp(2rem, 5vw, 6rem);
}

.hero-headline {
  font-size: clamp(2.25rem, 4vw, 4.5rem);
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: -0.03em;
  color: #f8fafc;
  text-shadow: 0 4px 24px rgba(0, 0, 0, 0.6);
}

.hero-subheadline {
  font-size: clamp(2.25rem, 4vw, 4.5rem);
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: -0.03em;
  color: #cbd5e1;
  text-shadow: 0 4px 24px rgba(0, 0, 0, 0.6);
}

.empty-column {
  display: block;
}

@media (max-aspect-ratio: 1/1) and (max-width: 768px) {
  .layout-grid {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }

  .hero-column {
    align-items: center;
    text-align: center;
    padding-top: 3.5rem;
  }

  .hero-headline,
  .hero-subheadline {
    font-size: clamp(1.75rem, 6vw, 2.5rem);
  }
}
