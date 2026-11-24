'use client';

import { useEffect, useMemo, useRef } from 'react';

import './IconCloud.css';

const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
const YAW_SPEED = 0.5;
const DRAG_SENSITIVITY = 0.008;
const BASE_TILT = -0.3;
const FOCAL = 3.2;
const RADIUS_RATIO = 0.33;

const EMPTY = [];

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

function spherePoints(count) {
  if (count <= 0) return [];
  if (count === 1) return [[0, 0, 1]];

  const points = [];
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const radius = Math.sqrt(Math.max(0, 1 - y * y));
    const angle = GOLDEN_ANGLE * i;
    points.push([Math.cos(angle) * radius, y, Math.sin(angle) * radius]);
  }
  return points;
}

export function IconCloud({
  icons = EMPTY,
  images = EMPTY,
  iconSize,
  speed = 1,
  color,
  ariaLabel = 'Icon cloud',
  className = '',
  style,
  ...props
}) {
  const containerRef = useRef(null);
  const itemEls = useRef([]);
  const stateRef = useRef({
    rotX: BASE_TILT,
    rotY: 0,
    velY: YAW_SPEED,
    dragging: false,
    lastX: 0,
    lastY: 0,
    lastMove: 0,
    pointerId: null
  });

  const nodes = useMemo(() => {
    const list = [...icons];
    images.forEach((src, i) => {
      list.push(
        <img key={`icon-cloud-img-${i}`} src={src} alt="" draggable={false} loading="lazy" decoding="async" />
      );
    });
    return list;
  }, [icons, images]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || nodes.length === 0) return;

    const st = stateRef.current;
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const autoSpin = prefersReducedMotion ? 0 : YAW_SPEED * speed;

    st.rotX = BASE_TILT;
    st.rotY = 0;
    st.velY = autoSpin;
    st.dragging = false;
    st.pointerId = null;

    const points = spherePoints(nodes.length);
    const items = itemEls.current;
    let radius = 1;

    const applySize = () => {
      const w = container.clientWidth || 1;
      const h = container.clientHeight || w;
      const base = Math.min(w, h) || w;
      radius = base * RADIUS_RATIO;
      const size = iconSize ?? clamp(base * 0.1, 22, 46);
      container.style.setProperty('--icon-size', `${Math.round(size)}px`);
    };
    applySize();

    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(applySize) : null;
    observer?.observe(container);

    let raf = 0;
    let last = performance.now();
    let ready = false;

    const frame = now => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      if (!st.dragging) {
        st.rotY += st.velY * dt;
        st.velY += (autoSpin - st.velY) * Math.min(1, dt * 1.8);
        st.rotX += (BASE_TILT - st.rotX) * Math.min(1, dt * 2.2);
      }
      st.rotX = clamp(st.rotX, -1.15, 1.15);

      const cosY = Math.cos(st.rotY);
      const sinY = Math.sin(st.rotY);
      const cosX = Math.cos(st.rotX);
      const sinX = Math.sin(st.rotX);

      for (let i = 0; i < points.length; i++) {
        const el = items[i];
        if (!el) continue;

        const [x, y, z] = points[i];

        const x1 = x * cosY - z * sinY;
        const z1 = x * sinY + z * cosY;
        const y1 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;

        const perspective = FOCAL / (FOCAL - z2);
        const px = x1 * radius * perspective;
        const py = -y1 * radius * perspective;
        const depth = (z2 + 1) / 2;

        el.style.transform = `translate3d(${px.toFixed(2)}px, ${py.toFixed(2)}px, 0) scale(${perspective.toFixed(
          3
        )})`;
        el.style.opacity = (0.28 + depth * 0.72).toFixed(3);
        el.style.zIndex = String(Math.round(depth * 1000));
      }

      if (!ready) {
        ready = true;
        container.classList.add('is-ready');
      }

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      observer?.disconnect();
      container.classList.remove('is-ready');
    };
  }, [nodes, speed, iconSize]);

  const handlePointerDown = event => {
    const st = stateRef.current;
    st.dragging = true;
    st.pointerId = event.pointerId;
    st.lastX = event.clientX;
    st.lastY = event.clientY;
    st.lastMove = performance.now();
    st.velY = 0;
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      /* pointer capture is best-effort */
    }
  };

  const handlePointerMove = event => {
    const st = stateRef.current;
    if (!st.dragging || event.pointerId !== st.pointerId) return;

    const dx = event.clientX - st.lastX;
    const dy = event.clientY - st.lastY;
    const now = performance.now();
    const dt = Math.max((now - st.lastMove) / 1000, 0.001);

    st.rotY += dx * DRAG_SENSITIVITY;
    st.rotX = clamp(st.rotX + dy * DRAG_SENSITIVITY, -1.15, 1.15);
    st.velY = clamp((dx * DRAG_SENSITIVITY) / dt, -6, 6);

    st.lastX = event.clientX;
    st.lastY = event.clientY;
    st.lastMove = now;
  };

  const handlePointerEnd = event => {
    const st = stateRef.current;
    if (st.pointerId !== event.pointerId) return;
    st.dragging = false;
    st.pointerId = null;
    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      /* already released */
    }
  };

  return (
    <div
      ref={containerRef}
      className={['icon-cloud', className].filter(Boolean).join(' ')}
      role="img"
      aria-label={ariaLabel}
      style={{ '--icon-cloud-color': color, ...style }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
      onLostPointerCapture={handlePointerEnd}
      {...props}
    >
      <div className="icon-cloud__stage">
        {nodes.map((node, i) => (
          <span
            className="icon-cloud__item"
            key={(node && node.key) ?? `icon-cloud-item-${i}`}
            ref={el => {
              itemEls.current[i] = el;
            }}
          >
            {node}
          </span>
        ))}
      </div>
    </div>
  );
}

export default IconCloud;
