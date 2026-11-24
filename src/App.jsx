import { useEffect, useState } from 'react';
import { AnimatedCircularProgressBar } from '../magicui/animated-circular-progress-bar/src/AnimatedCircularProgressBar';
import { DiaTextReveal } from '../magicui/dia-text-reveal/src/DiaTextReveal';

const useCycle = (step = 10, interval = 1600) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setValue(prev => (prev >= 100 ? 0 : prev + step)), interval);
    return () => clearInterval(id);
  }, [step, interval]);
  return value;
};

const STATIC = [25, 50, 75, 100];

const App = () => {
  const live = useCycle(10, 1600);

  return (
    <div className="lab">
      <header className="lab-header">
        <p className="lab-kicker">UI Collection Lab</p>
        <h1>Component Lab</h1>
        <p className="lab-sub">
          Black-gray themed components, each shipped as a self-contained skill with source.
        </p>
      </header>

      <main className="lab-stage">
        <section className="lab-section">
          <div className="lab-section__head">
            <h2 className="lab-section__title">Animated Circular Progress Bar</h2>
            <span className="lab-section__hint">SVG gauge · plain CSS</span>
          </div>
          <div className="acp-card acp-card--feature">
            <div className="acp-card__head">
              <span className="acp-card__label">Live</span>
              <span className="acp-card__meta">value: {live}</span>
            </div>
            <AnimatedCircularProgressBar value={live} size={200} />
          </div>
          <div className="acp-row">
            {STATIC.map(value => (
              <div className="acp-card" key={value}>
                <span className="acp-card__label">{value}%</span>
                <AnimatedCircularProgressBar value={value} size={128} />
              </div>
            ))}
          </div>
        </section>

        <section className="lab-section">
          <div className="lab-section__head">
            <h2 className="lab-section__title">Dia Text Reveal</h2>
            <span className="lab-section__hint">sweeping gradient band</span>
          </div>
          <div className="dia-card">
            <p className="dia-line">
              Single sweep:{' '}
              <DiaTextReveal className="dia-line__text" text="Black Gray" duration={1.8} />
            </p>
            <h3 className="dia-headline">
              Learn to{' '}
              <DiaTextReveal repeat repeatDelay={1.2} text={['build faster', 'ship smarter', 'scale easier']} />
            </h3>
            <p className="dia-caption">Hover or reload to replay the single sweep. The headline rotates on loop.</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
