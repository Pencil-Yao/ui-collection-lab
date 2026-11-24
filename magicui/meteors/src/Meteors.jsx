'use client';

import { useEffect, useState } from 'react';

import './Meteors.css';

const rand = (min, max) => Math.random() * (max - min) + min;

export function Meteors({
  number = 20,
  minDelay = 0.2,
  maxDelay = 1.2,
  minDuration = 2,
  maxDuration = 10,
  angle = 240,
  className = ''
}) {
  const [meteors, setMeteors] = useState([]);

  useEffect(() => {
    const styles = Array.from({ length: number }, () => ({
      '--angle': `${angle}deg`,
      top: '-5%',
      // Start some meteors just past the left edge so the left side gets streaks
      // too — they drift into view rather than only spawning mid-canvas.
      left: `${rand(-25, 100)}%`,
      animationDelay: `${rand(minDelay, maxDelay)}s`,
      animationDuration: `${rand(minDuration, maxDuration)}s`
    }));
    setMeteors(styles);
  }, [number, minDelay, maxDelay, minDuration, maxDuration, angle]);

  return (
    <div className={['meteors', className].filter(Boolean).join(' ')} aria-hidden="true">
      {meteors.map((style, index) => (
        <span key={index} className="meteors__item" style={style}>
          <span className="meteors__tail" />
        </span>
      ))}
    </div>
  );
}

export default Meteors;
