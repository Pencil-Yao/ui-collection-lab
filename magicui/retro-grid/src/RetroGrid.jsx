'use client';

import { useEffect, useRef } from 'react';

import './RetroGrid.css';

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

// Perspective floor drawn on a 2D canvas (anti-aliased each frame). The camera
// and scroll direction are the original ones: lines emerge at the far horizon
// and travel toward the viewer. Only `cellSize` controls the longitudinal
// (depth-line) spacing.
export function RetroGrid({
  className = '',
  angle = 65,
  cellSize = 100,
  opacity = 0.7,
  lineColor = 'rgba(255, 255, 255, 0.5)',
  speed = 0.18,
  children,
  style,
  phase,
  ...props
}) {
  const canvasRef = useRef(null);
  const drawRef = useRef(null);
  const phaseRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    let dpr = 1;
    let width = 0;
    let height = 0;

    const draw = p => {
      if (!width || !height) return;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const a = clamp(angle, 1, 89);
      const horizonRatio = clamp(0.34 - a * 0.0031, 0.06, 0.3);
      const horizonY = height * horizonRatio;
      const span = Math.max(1, height - horizonY);
      const cx = width / 2;
      const cell = Math.max(6, cellSize);

      ctx.save();
      ctx.globalAlpha = clamp(opacity, 0, 1);
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 1;
      ctx.beginPath();

      // Depth lines (constant world x): converge on the vanishing point.
      const maxM = Math.ceil(width / (2 * cell)) + 3;
      for (let m = -maxM; m <= maxM; m++) {
        const xBottom = cx + m * cell;
        ctx.moveTo(xBottom, height);
        ctx.lineTo(cx, horizonY);
      }

      // Cross lines (constant world z): scroll toward the viewer (far -> near).
      const zFar = 26;
      for (let n = 1; n <= zFar; n++) {
        const z = n - p;
        if (z < 1) continue;
        const y = horizonY + span / z;
        if (y <= horizonY + 0.5 || y > height + 1) continue;
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }

      ctx.stroke();
      ctx.restore();

      // Fades (reveal the parent background): far/horizon band and near edge.
      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';

      const bandFull = Math.min(height, horizonY + height * 0.09);
      const bandEnd = Math.min(height, horizonY + height * 0.19);
      const gTop = ctx.createLinearGradient(0, 0, 0, Math.max(1, bandEnd));
      gTop.addColorStop(0, 'rgba(0, 0, 0, 1)');
      gTop.addColorStop(Math.min(0.999, bandFull / Math.max(1, bandEnd)), 'rgba(0, 0, 0, 1)');
      gTop.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gTop;
      ctx.fillRect(0, 0, width, bandEnd);

      const bStart = height * 0.94;
      const gBottom = ctx.createLinearGradient(0, bStart, 0, height);
      gBottom.addColorStop(0, 'rgba(0, 0, 0, 0)');
      gBottom.addColorStop(1, 'rgba(0, 0, 0, 0.85)');
      ctx.fillStyle = gBottom;
      ctx.fillRect(0, bStart, width, height - bStart);

      ctx.restore();
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      draw(phaseRef.current);
    };

    drawRef.current = draw;
    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(resize) : null;
    observer?.observe(canvas);
    resize();

    let raf = 0;
    if (typeof phase === 'number') {
      phaseRef.current = ((phase % 1) + 1) % 1;
      draw(phaseRef.current);
    } else if (!reduce) {
      let last = performance.now();
      const loop = now => {
        const dt = Math.min((now - last) / 1000, 0.1);
        last = now;
        phaseRef.current = (phaseRef.current + dt * speed) % 1;
        draw(phaseRef.current);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    } else {
      draw(0);
    }

    return () => {
      cancelAnimationFrame(raf);
      observer?.disconnect();
      drawRef.current = null;
    };
  }, [angle, cellSize, opacity, lineColor, speed]);

  useEffect(() => {
    if (typeof phase === 'number' && drawRef.current) {
      phaseRef.current = ((phase % 1) + 1) % 1;
      drawRef.current(phaseRef.current);
    }
  }, [phase]);

  return (
    <div
      className={['retro-grid', className].filter(Boolean).join(' ')}
      aria-hidden={children ? undefined : 'true'}
      style={style}
      {...props}
    >
      <canvas ref={canvasRef} className="retro-grid__canvas" />
      {children ? <div className="retro-grid__content">{children}</div> : null}
    </div>
  );
}

export default RetroGrid;
