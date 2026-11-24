'use client';

import { useEffect, useRef } from 'react';
import createGlobe from 'cobe';
import { useMotionValue, useSpring } from 'motion/react';

import './Globe.css';

const MOVEMENT_DAMPING = 1400;

export const GLOBE_CONFIG = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 1,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 2.5,
  mapBaseBrightness: 0,
  baseColor: [0.9, 0.9, 0.95],
  markerColor: [1, 1, 1],
  glowColor: [0.3, 0.3, 0.33],
  markers: [
    { location: [14.5995, 120.9842], size: 0.03 },
    { location: [19.076, 72.8777], size: 0.1 },
    { location: [23.8103, 90.4125], size: 0.05 },
    { location: [30.0444, 31.2357], size: 0.07 },
    { location: [39.9042, 116.4074], size: 0.08 },
    { location: [-23.5505, -46.6333], size: 0.1 },
    { location: [19.4326, -99.1332], size: 0.1 },
    { location: [40.7128, -74.006], size: 0.1 },
    { location: [34.6937, 135.5022], size: 0.05 },
    { location: [41.0082, 28.9784], size: 0.06 }
  ]
};

export function Globe({ className = '', config = GLOBE_CONFIG, speed = 1 }) {
  const canvasRef = useRef(null);
  const phiRef = useRef(0);
  const widthRef = useRef(0);
  const lastTimeRef = useRef(0);
  const pointerInteracting = useRef(null);
  const pointerInteractionMovement = useRef(0);

  const r = useMotionValue(0);
  const rs = useSpring(r, { mass: 1, damping: 30, stiffness: 100 });

  const updatePointerInteraction = value => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? 'grabbing' : 'grab';
    }
  };

  const updateMovement = clientX => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      r.set(r.get() + delta / MOVEMENT_DAMPING);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onResize = () => {
      if (canvasRef.current) widthRef.current = canvasRef.current.offsetWidth;
    };

    window.addEventListener('resize', onResize);
    onResize();

    lastTimeRef.current = performance.now();

    const globe = createGlobe(canvas, {
      ...config,
      width: widthRef.current * 2,
      height: widthRef.current * 2,
      onRender: state => {
        // Time-based auto-rotation (radians/second) so the speed is consistent
        // regardless of frame rate, and scales with the `speed` prop.
        const now = performance.now();
        const dt = Math.min(Math.max((now - lastTimeRef.current) / 1000, 0), 0.1);
        lastTimeRef.current = now;
        if (!pointerInteracting.current) phiRef.current += 0.3 * speed * dt;
        // Guard against non-finite values: a single NaN phi/size leaks into the
        // shader uniforms and makes the whole sphere (and its map dots) vanish.
        const drag = rs.get();
        const size = (widthRef.current || canvas.offsetWidth || 300) * 2;
        state.phi = phiRef.current + (Number.isFinite(drag) ? drag : 0);
        state.width = size;
        state.height = size;
      }
    });

    const fadeIn = setTimeout(() => {
      if (canvasRef.current) canvasRef.current.style.opacity = '1';
    }, 0);

    return () => {
      clearTimeout(fadeIn);
      globe.destroy();
      window.removeEventListener('resize', onResize);
    };
  }, [rs, config, speed]);

  return (
    <div className={['globe', className].filter(Boolean).join(' ')}>
      <canvas
        ref={canvasRef}
        className="globe__canvas"
        onPointerDown={event => {
          pointerInteracting.current = event.clientX;
          updatePointerInteraction(event.clientX);
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={event => updateMovement(event.clientX)}
        onTouchMove={event => event.touches[0] && updateMovement(event.touches[0].clientX)}
      />
    </div>
  );
}

export default Globe;
