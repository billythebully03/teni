import { Lanyard } from './ui/lanyard';

export const App = () => {
  return (
    <main style={{ width: '100%', height: '100dvh' }}>
      <Lanyard
        cardColor="#ffffff"
        finish="glossy"
        metal="silver"
        anchor="center"
        strapColor="#111111"
        strapLength={0.45}
        elasticity={0.2}
        damping={0.55}
        intro={true}
        interactive={true}
      />
    </main>
  );
};
