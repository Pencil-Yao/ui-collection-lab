import { useEffect, useState } from 'react';
import { AnimatedCircularProgressBar } from '../magicui/animated-circular-progress-bar/src/AnimatedCircularProgressBar';
import { DiaTextReveal } from '../magicui/dia-text-reveal/src/DiaTextReveal';
import { Globe } from '../magicui/globe/src/Globe';
import { IconCloud } from '../magicui/icon-cloud/src/IconCloud';
import { Meteors } from '../magicui/meteors/src/Meteors';
import { MorphingText } from '../magicui/morphing-text/src/MorphingText';
import { techIcons } from './techIcons';

const useCycle = (step = 10, interval = 1600) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setValue(prev => (prev >= 100 ? 0 : prev + step)), interval);
    return () => clearInterval(id);
  }, [step, interval]);
  return value;
};

const App = () => {
  const live = useCycle(10, 1600);

  return (
    <div className="lab">
      <header className="lab-header">
        <p className="lab-kicker">UI Collection Lab</p>
        <h1>Component Lab</h1>
        <p className="lab-sub">
          Black-gray themed components, one square frame each. Full source ships under <code>magicui/</code>.
        </p>
      </header>

      <main className="lab-stage">
        <div className="showcase">
          <figure className="showcase__cell">
            <figcaption className="showcase__caption">
              <span className="showcase__title">Animated Circular Progress Bar</span>
              <span className="showcase__meta">{live}%</span>
            </figcaption>
            <div className="showcase__body">
              <AnimatedCircularProgressBar value={live} size={200} />
            </div>
          </figure>

          <figure className="showcase__cell">
            <figcaption className="showcase__caption">
              <span className="showcase__title">Dia Text Reveal</span>
              <span className="showcase__meta">sweep</span>
            </figcaption>
            <div className="showcase__body">
              <DiaTextReveal
                className="showcase__reveal"
                repeat
                repeatDelay={1.2}
                text={['build faster', 'ship smarter', 'scale easier']}
              />
            </div>
          </figure>

          <figure className="showcase__cell">
            <figcaption className="showcase__caption">
              <span className="showcase__title">Globe</span>
              <span className="showcase__meta">WebGL</span>
            </figcaption>
            <div className="showcase__body showcase__body--globe">
              <div className="showcase__globe">
                <Globe />
              </div>
            </div>
          </figure>

          <figure className="showcase__cell">
            <figcaption className="showcase__caption">
              <span className="showcase__title">Icon Cloud</span>
              <span className="showcase__meta">drag</span>
            </figcaption>
            <div className="showcase__body showcase__body--icon-cloud">
              <div className="showcase__icon-cloud">
                <IconCloud icons={techIcons} ariaLabel="Technology icons" />
              </div>
            </div>
          </figure>

          <figure className="showcase__cell">
            <figcaption className="showcase__caption">
              <span className="showcase__title">Meteors</span>
              <span className="showcase__meta">shower</span>
            </figcaption>
            <div className="showcase__body showcase__body--meteors">
              <div className="showcase__meteors">
                <Meteors number={28} />
                <div className="showcase__meteors-copy">
                  <span className="showcase__meteors-kicker">Night sky</span>
                  <span className="showcase__meteors-title">Meteor shower</span>
                </div>
              </div>
            </div>
          </figure>

          <figure className="showcase__cell">
            <figcaption className="showcase__caption">
              <span className="showcase__title">Morphing Text</span>
              <span className="showcase__meta">gooey</span>
            </figcaption>
            <div className="showcase__body showcase__body--morphing">
              <div className="showcase__morphing">
                <MorphingText texts={['Morphing Text', 'Fusion Smooth', 'Gooey Blur']} />
              </div>
            </div>
          </figure>
        </div>
      </main>
    </div>
  );
};

export default App;
