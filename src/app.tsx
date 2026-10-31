import { Lanyard } from './ui/lanyard';

export const App = () => {
  return (
    <main style={{ width: '100%', height: '100dvh' }}>
      <Lanyard
        cardColor="#f4f5f7"
        finish="glossy"
        metal="silver"
        anchor="center"
        strapColor="#1a1a1a"
        strapLength={0.45}
        intro={true}
        interactive={true}
      />
    </main>
  );
};
