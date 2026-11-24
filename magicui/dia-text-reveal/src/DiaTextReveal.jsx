'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from 'motion/react';

import './DiaTextReveal.css';

const DEFAULT_COLORS = ['#52525b', '#a1a1aa', '#f4f4f5', '#d4d4d8', '#71717a'];
const BAND_HALF = 17;
const SWEEP_START = -BAND_HALF;
const SWEEP_END = 100 + BAND_HALF;

const sweepEase = t => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2);

function buildGradient(pos, colors, textColor) {
  const bandStart = pos - BAND_HALF;
  const bandEnd = pos + BAND_HALF;

  if (bandStart >= 100) {
    return `linear-gradient(90deg, ${textColor}, ${textColor})`;
  }

  const n = colors.length;
  const parts = [];

  if (bandStart > 0) parts.push(`${textColor} 0%`, `${textColor} ${bandStart.toFixed(2)}%`);

  colors.forEach((c, i) => {
    const pct = n === 1 ? pos : bandStart + (i / (n - 1)) * BAND_HALF * 2;
    parts.push(`${c} ${pct.toFixed(2)}%`);
  });

  if (bandEnd < 100) parts.push(`transparent ${bandEnd.toFixed(2)}%`, `transparent 100%`);

  return `linear-gradient(90deg, ${parts.join(', ')})`;
}

function measureWidths(el, texts) {
  const ghost = el.cloneNode();
  Object.assign(ghost.style, {
    position: 'absolute',
    visibility: 'hidden',
    pointerEvents: 'none',
    width: 'auto',
    whiteSpace: 'nowrap'
  });
  el.parentElement.appendChild(ghost);
  const widths = texts.map(t => {
    ghost.textContent = t;
    // +1px buffer so sub-pixel rounding never clips the last glyph
    return Math.ceil(ghost.getBoundingClientRect().width) + 1;
  });
  ghost.remove();
  return widths;
}

export function DiaTextReveal({
  text,
  colors = DEFAULT_COLORS,
  textColor = '#f4f4f5',
  duration = 1.5,
  delay = 0,
  repeat = false,
  repeatDelay = 0.5,
  startOnView = true,
  once = true,
  className = '',
  fixedWidth = false,
  ...props
}) {
  const texts = Array.isArray(text) ? text : [text];
  const isMulti = texts.length > 1;
  const prefersReducedMotion = useReducedMotion();

  const spanRef = useRef(null);
  const opts = { duration, delay, repeat, repeatDelay, texts };
  const optsRef = useRef(opts);
  useEffect(() => {
    optsRef.current = opts;
  });

  const indexRef = useRef(0);
  const hasPlayedRef = useRef(false);
  const timerRef = useRef(undefined);
  const stopRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [measuredWidths, setMeasuredWidths] = useState([]);

  const sweepPos = useMotionValue(SWEEP_START);

  const backgroundImage = useTransform(sweepPos, pos => buildGradient(pos, colors, textColor));

  const isInView = useInView(spanRef, { once, amount: 0.1 });

  useEffect(() => {
    const el = spanRef.current;
    if (!el || !isMulti) return;

    const remeasure = () => setMeasuredWidths(measureWidths(el, texts));
    remeasure();

    // Re-measure when the container resizes or fonts load, otherwise the box
    // can be narrower than the text and clip it.
    const target = el.parentElement || el;
    const observer = new ResizeObserver(remeasure);
    observer.observe(target);
    window.addEventListener('resize', remeasure);
    let cancelled = false;
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (!cancelled) remeasure();
      });
    }

    return () => {
      cancelled = true;
      observer.disconnect();
      window.removeEventListener('resize', remeasure);
    };
  }, [Array.isArray(text) ? text.join('\0') : text, isMulti]);

  useEffect(() => {
    if (prefersReducedMotion) {
      sweepPos.set(SWEEP_END);
      return;
    }
    if (startOnView && !isInView) return;
    if (once && hasPlayedRef.current) return;
    hasPlayedRef.current = true;

    const play = () => {
      const { duration, delay, repeat, repeatDelay, texts } = optsRef.current;

      sweepPos.set(SWEEP_START);

      const controls = animate(sweepPos, SWEEP_END, {
        duration,
        delay,
        ease: sweepEase,
        onComplete() {
          if (!repeat) return;
          timerRef.current = setTimeout(() => {
            const next = (indexRef.current + 1) % texts.length;
            indexRef.current = next;
            setActiveIndex(next);
            play();
          }, repeatDelay * 1000);
        }
      });

      stopRef.current = () => controls.stop();
    };
    play();

    return () => {
      stopRef.current?.();
      clearTimeout(timerRef.current);
    };
  }, [isInView, startOnView, once, prefersReducedMotion, sweepPos]);

  const fixedW = isMulti && fixedWidth && measuredWidths.length > 0 ? Math.max(...measuredWidths) : undefined;

  const animatedW = isMulti && !fixedWidth && measuredWidths[activeIndex] != null ? measuredWidths[activeIndex] : undefined;

  return (
    <motion.span
      ref={spanRef}
      className={['dia-text-reveal', className].filter(Boolean).join(' ')}
      style={{
        transform: 'translateY(-2px)',
        color: 'transparent',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        backgroundSize: '100% 100%',
        backgroundImage,
        ...(isMulti && {
          display: 'inline-block',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          verticalAlign: 'bottom',
          width: fixedW ?? animatedW
        })
      }}
      {...props}
    >
      {texts[activeIndex]}
    </motion.span>
  );
}

export default DiaTextReveal;
