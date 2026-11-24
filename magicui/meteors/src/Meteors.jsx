'use client';

import { useEffect, useRef, useState } from 'react';

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
  const containerRef = useRef(null);
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

  // Scale the travel distance to the container so meteors always cross the full
  // height (reaching the middle/bottom) no matter how large the box is, instead
  // of tailing off after a fixed number of pixels.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const apply = () => {
      const height = el.clientHeight || 0;
      const rad = (angle * Math.PI) / 180;
      const sin = Math.max(Math.abs(Math.sin(rad)), 0.35);
      const distance = (height * 1.15) / sin;
      el.style.setProperty('--meteor-distance', `${Math.round(distance)}px`);
    };

    apply();
    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(apply) : null;
    observer?.observe(el);
    return () => observer?.disconnect();
  }, [angle]);

  return (
    <div
      ref={containerRef}
      className={['meteors', className].filter(Boolean).join(' ')}
      aria-hidden="true"
    >
      {meteors.map((style, index) => (
        <span key={index} className="meteors__item" style={style}>
          <span className="meteors__tail" />
        </span>
      ))}
    </div>
  );
}

export default Meteors;
