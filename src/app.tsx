import { Lanyard } from './ui/lanyard';
import './app.css';

export const App = () => {
  return (
    <main className="viewport">
      <div className="lanyard-layer">
        <Lanyard
          size={0.4}
          finish="metallic"
          cardColor="#848b94"
          metal="silver"
          anchor="center"
          strapColor="#0e0e11"
          strapLength={0.45}
          elasticity={0.2}
          damping={0.55}
          intro={true}
          interactive={true}
        />
      </div>

      <div className="layout-grid">
        <section className="hero-column">
          <h1 className="hero-headline">Те, кто в тени</h1>
          <h2 className="hero-subheadline">Ведем набор в гильдию</h2>
        </section>
        <div className="empty-column" aria-hidden="true" />
      </div>
    </main>
  );
};
