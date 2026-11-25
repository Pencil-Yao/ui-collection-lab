import { useEffect, useState } from 'react';
import { AnimatedCircularProgressBar } from '../magicui/animated-circular-progress-bar/src/AnimatedCircularProgressBar';
import { DiaTextReveal } from '../magicui/dia-text-reveal/src/DiaTextReveal';
import { Globe } from '../magicui/globe/src/Globe';
import { IconCloud } from '../magicui/icon-cloud/src/IconCloud';
import { Meteors } from '../magicui/meteors/src/Meteors';
import { MorphingText } from '../magicui/morphing-text/src/MorphingText';
import { RetroGrid } from '../magicui/retro-grid/src/RetroGrid';
import {
  ScrollVelocityContainer,
  ScrollVelocityRow
} from '../magicui/scroll-based-velocity/src/ScrollBasedVelocity';
import { ShinyButton } from '../magicui/shiny-button/src/ShinyButton';
import { TypingAnimation } from '../magicui/typing-animation/src/TypingAnimation';
import { techIcons } from './techIcons';

// Component IDs double as in-page anchors, e.g. `/#globe` or `/#icon-cloud`.
const COMPONENTS = [
  { id: 'animated-circular-progress-bar', title: 'Animated Circular Progress Bar' },
  { id: 'dia-text-reveal', title: 'Dia Text Reveal' },
  { id: 'globe', title: 'Globe' },
  { id: 'icon-cloud', title: 'Icon Cloud' },
  { id: 'meteors', title: 'Meteors' },
  { id: 'morphing-text', title: 'Morphing Text' },
  { id: 'retro-grid', title: 'Retro Grid' },
  { id: 'scroll-based-velocity', title: 'Scroll Based Velocity' },
  { id: 'shiny-button', title: 'Shiny Button' },
  { id: 'typing-animation', title: 'Typing Animation' }
];

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

  // Scroll to the component referenced by the URL hash (works on load and on
  // clicks of the index links; the element may mount after the browser's own
  // initial hash scroll).
  useEffect(() => {
    const scrollToHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) return;
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    const timer = setTimeout(scrollToHash, 60);
    window.addEventListener('hashchange', scrollToHash);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('hashchange', scrollToHash);
    };
  }, []);

  return (
    <div className="lab">
      <header className="lab-header">
        <p className="lab-kicker">UI Collection Lab</p>
        <h1>Component Lab</h1>
        <p className="lab-sub">
          Black-gray themed components, one square frame each. Full source ships under <code>magicui/</code>.
        </p>
        <nav className="lab-index" aria-label="Component index">
          {COMPONENTS.map(({ id, title }) => (
            <a key={id} href={`#${id}`} title={title}>
              <span className="lab-index__slug">#{id}</span>
              <span className="lab-index__title">{title}</span>
            </a>
          ))}
        </nav>
      </header>

      <main className="lab-stage">
        <div className="showcase">
          <figure className="showcase__cell" id="animated-circular-progress-bar">
            <figcaption className="showcase__caption">
              <span className="showcase__title">Animated Circular Progress Bar</span>
              <span className="showcase__meta">{live}%</span>
            </figcaption>
            <div className="showcase__body">
              <AnimatedCircularProgressBar value={live} size={200} />
            </div>
          </figure>

          <figure className="showcase__cell" id="dia-text-reveal">
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

          <figure className="showcase__cell" id="globe">
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

          <figure className="showcase__cell" id="icon-cloud">
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

          <figure className="showcase__cell" id="meteors">
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

          <figure className="showcase__cell" id="morphing-text">
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

          <figure className="showcase__cell" id="retro-grid">
            <figcaption className="showcase__caption">
              <span className="showcase__title">Retro Grid</span>
              <span className="showcase__meta">perspective</span>
            </figcaption>
            <div className="showcase__body showcase__body--fill">
              <div className="showcase__retro">
                <RetroGrid>
                  <span className="showcase__retro-kicker">Synthwave</span>
                  <span className="showcase__retro-title">Retro Grid</span>
                </RetroGrid>
              </div>
            </div>
          </figure>

          <figure className="showcase__cell" id="scroll-based-velocity">
            <figcaption className="showcase__caption">
              <span className="showcase__title">Scroll Based Velocity</span>
              <span className="showcase__meta">kinetic</span>
            </figcaption>
            <div className="showcase__body showcase__body--fill showcase__body--velocity">
              <div className="showcase__velocity">
                <ScrollVelocityContainer>
                  <ScrollVelocityRow baseVelocity={12} direction={1}>
                    <span className="showcase__velocity-text">CREATIVE • DESIGN • MOTION • </span>
                  </ScrollVelocityRow>
                  <ScrollVelocityRow baseVelocity={12} direction={-1}>
                    <span className="showcase__velocity-text showcase__velocity-text--dim">
                      BUILD FASTER • SHIP SMARTER • SCALE EASIER •{' '}
                    </span>
                  </ScrollVelocityRow>
                </ScrollVelocityContainer>
              </div>
            </div>
          </figure>

          <figure className="showcase__cell" id="shiny-button">
            <figcaption className="showcase__caption">
              <span className="showcase__title">Shiny Button</span>
              <span className="showcase__meta">shine</span>
            </figcaption>
            <div className="showcase__body">
              <ShinyButton type="button">Get Started</ShinyButton>
            </div>
          </figure>

          <figure className="showcase__cell" id="typing-animation">
            <figcaption className="showcase__caption">
              <span className="showcase__title">Typing Animation</span>
              <span className="showcase__meta">typewriter</span>
            </figcaption>
            <div className="showcase__body">
              <TypingAnimation
                className="showcase__typing"
                words={['Typing Animation', 'Build Faster', 'Ship Smarter']}
                loop
              />
            </div>
          </figure>
        </div>
      </main>
    </div>
  );
};

export default App;
