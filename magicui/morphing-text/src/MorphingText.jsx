'use client';

import { useEffect, useId, useRef } from 'react';

import './MorphingText.css';

const DEFAULT_MORPH_TIME = 1.5;
const DEFAULT_COOLDOWN_TIME = 0.5;
const THRESHOLD_MATRIX = `1 0 0 0 0
0 1 0 0 0
0 0 1 0 0
0 0 0 255 -140`;

export function MorphingText({
  texts = [],
  morphTime = DEFAULT_MORPH_TIME,
  cooldownTime = DEFAULT_COOLDOWN_TIME,
  blur = 0.6,
  className = '',
  style,
  ...props
}) {
  const filterId = `morphing-text-${useId().replace(/:/g, '')}`;
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);

  const textsRef = useRef(texts);
  textsRef.current = texts;
  const timingRef = useRef({ morphTime, cooldownTime });
  timingRef.current = { morphTime, cooldownTime };

  useEffect(() => {
    const current1 = text1Ref.current;
    const current2 = text2Ref.current;
    if (!current1 || !current2) return;
    if (!textsRef.current || textsRef.current.length === 0) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      current1.textContent = textsRef.current[0];
      current1.style.filter = 'none';
      current1.style.opacity = '1';
      current2.textContent = '';
      current2.style.filter = 'none';
      current2.style.opacity = '0';
      return;
    }

    let index = 0;
    let morph = 0;
    let cooldown = 0;
    let last = performance.now();
    let raf = 0;

    const setStyles = fraction => {
      const list = textsRef.current;
      if (!list || list.length === 0) return;

      const f = Math.min(Math.max(fraction, 0), 1);
      const inverted = 1 - f;

      current2.style.filter = `blur(${Math.min(8 / f - 8, 100)}px)`;
      current2.style.opacity = `${Math.pow(f, 0.4) * 100}%`;
      current1.style.filter = `blur(${Math.min(8 / inverted - 8, 100)}px)`;
      current1.style.opacity = `${Math.pow(inverted, 0.4) * 100}%`;

      current1.textContent = list[index % list.length];
      current2.textContent = list[(index + 1) % list.length];
    };

    const doMorph = () => {
      morph -= cooldown;
      cooldown = 0;

      let fraction = morph / timingRef.current.morphTime;
      if (fraction > 1) {
        cooldown = timingRef.current.cooldownTime;
        fraction = 1;
      }

      setStyles(fraction);
      if (fraction === 1) index += 1;
    };

    const doCooldown = () => {
      morph = 0;
      current2.style.filter = 'none';
      current2.style.opacity = '100%';
      current1.style.filter = 'none';
      current1.style.opacity = '0%';
    };

    const animate = now => {
      raf = requestAnimationFrame(animate);
      cooldown -= Math.min((now - last) / 1000, 0.1);
      last = now;

      if (cooldown <= 0) doMorph();
      else doCooldown();
    };

    raf = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      className={['morphing-text', className].filter(Boolean).join(' ')}
      style={{ filter: `url(#${filterId}) blur(${blur}px)`, ...style }}
      {...props}
    >
      {texts[0] ? <span className="morphing-text__sr">{texts[0]}</span> : null}
      <span ref={text1Ref} className="morphing-text__span" aria-hidden="true" />
      <span ref={text2Ref} className="morphing-text__span" aria-hidden="true" />
      <svg className="morphing-text__defs" width="0" height="0" aria-hidden="true" focusable="false">
        <defs>
          <filter id={filterId}>
            <feColorMatrix in="SourceGraphic" type="matrix" values={THRESHOLD_MATRIX} />
          </filter>
        </defs>
      </svg>
    </div>
  );
}

export default MorphingText;
