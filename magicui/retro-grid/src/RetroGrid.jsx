'use client';

import { useEffect, useRef } from 'react';

import './RetroGrid.css';

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const VERTEX_SHADER = `#version 300 es
in vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `#version 300 es
precision highp float;
out vec4 outColor;

uniform vec2 u_res;
uniform float u_d;
uniform float u_cx;
uniform float u_cy;
uniform float u_cos;
uniform float u_sin;
uniform float u_cell;
uniform float u_scroll;
uniform float u_opacity;
uniform vec3 u_color;

void main() {
  vec2 frag = gl_FragCoord.xy;
  float sx = frag.x;
  float sy = u_res.y - frag.y;

  // Inverse of the tilted-plane homography: screen -> plane coordinates.
  float delta = sy - u_cy;
  float denom = u_d * u_cos + delta * u_sin;
  float v = delta * u_d / denom;
  float scale = u_d / (u_d - v * u_sin);
  float u = (sx - u_cx) / scale;

  v += u_scroll;

  vec2 g = vec2(u, v) / u_cell;
  vec2 w = max(fwidth(g), vec2(1e-5));
  vec2 grid = abs(fract(g - 0.5) - 0.5) / w;
  float dist = min(grid.x, grid.y);
  float intensity = 1.0 - min(dist, 1.0);

  // Thin fade only at the extreme top (far) and near edge so the grid still
  // covers the whole frame.
  float topFade = smoothstep(0.0, 0.06 * u_res.y, sy);
  float botFade = 1.0 - smoothstep(0.95 * u_res.y, u_res.y, sy);

  float alpha = intensity * u_opacity * topFade * botFade;
  outColor = vec4(u_color * alpha, alpha);
}
`;

function parseColor(input, fallback = [0.7, 0.7, 0.75]) {
  if (!input) return fallback;
  const s = String(input).trim();
  if (s[0] === '#') {
    let h = s.slice(1);
    if (h.length === 3) h = h.split('').map(c => c + c).join('');
    if (h.length >= 6) {
      return [
        parseInt(h.slice(0, 2), 16) / 255,
        parseInt(h.slice(2, 4), 16) / 255,
        parseInt(h.slice(4, 6), 16) / 255
      ];
    }
  }
  const m = s.match(/rgba?\(([^)]+)\)/i);
  if (m) {
    const p = m[1].split(',').map(v => parseFloat(v));
    if (p.length >= 3) return [p[0] / 255, p[1] / 255, p[2] / 255];
  }
  return fallback;
}

export function RetroGrid({
  className = '',
  angle = 65,
  cellSize = 90,
  opacity = 0.7,
  lineColor = 'rgba(255, 255, 255, 0.6)',
  speed = 0.12,
  children,
  style,
  phase,
  ...props
}) {
  const canvasRef = useRef(null);
  const renderRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl2', {
      alpha: true,
      antialias: true,
      premultipliedAlpha: true
    });
    if (!gl) return;

    const compile = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };

    const program = gl.createProgram();
    gl.attachShader(program, compile(gl.VERTEX_SHADER, VERTEX_SHADER));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAGMENT_SHADER));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );
    const loc = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    gl.useProgram(program);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);

    const uniforms = {
      res: gl.getUniformLocation(program, 'u_res'),
      d: gl.getUniformLocation(program, 'u_d'),
      cx: gl.getUniformLocation(program, 'u_cx'),
      cy: gl.getUniformLocation(program, 'u_cy'),
      cos: gl.getUniformLocation(program, 'u_cos'),
      sin: gl.getUniformLocation(program, 'u_sin'),
      cell: gl.getUniformLocation(program, 'u_cell'),
      scroll: gl.getUniformLocation(program, 'u_scroll'),
      opacity: gl.getUniformLocation(program, 'u_opacity'),
      color: gl.getUniformLocation(program, 'u_color')
    };

    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const color = parseColor(lineColor);
    let dpr = 1;
    let width = 0;
    let height = 0;
    let cellPx = 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, Math.round(rect.width * dpr));
      height = Math.max(1, Math.round(rect.height * dpr));
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
      cellPx = Math.max(4, cellSize * dpr);
    };
    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(resize) : null;
    observer?.observe(canvas);
    resize();

    const render = p => {
      if (!width || !height) return;
      const a = (clamp(angle, 1, 89) * Math.PI) / 180;
      const sin = Math.sin(a);
      const cos = Math.cos(a);
      const cot = cos / sin;
      const d = height * 0.6;
      const cy = -0.12 * height + d * cot;
      const cx = width / 2;

      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);
      gl.uniform2f(uniforms.res, width, height);
      gl.uniform1f(uniforms.d, d);
      gl.uniform1f(uniforms.cx, cx);
      gl.uniform1f(uniforms.cy, cy);
      gl.uniform1f(uniforms.cos, cos);
      gl.uniform1f(uniforms.sin, sin);
      gl.uniform1f(uniforms.cell, cellPx);
      gl.uniform1f(uniforms.scroll, p * cellPx * 6);
      gl.uniform1f(uniforms.opacity, clamp(opacity, 0, 1));
      gl.uniform3f(uniforms.color, color[0], color[1], color[2]);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    renderRef.current = render;

    let raf = 0;
    if (typeof phase === 'number') {
      render(((phase % 1) + 1) % 1);
    } else if (!reduce) {
      let last = performance.now();
      let p = 0;
      const loop = now => {
        const dt = Math.min((now - last) / 1000, 0.1);
        last = now;
        p = (p + dt * speed) % 1;
        render(p);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    } else {
      render(0);
    }

    return () => {
      cancelAnimationFrame(raf);
      observer?.disconnect();
      renderRef.current = null;
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    };
  }, [angle, cellSize, opacity, lineColor, speed]);

  useEffect(() => {
    if (typeof phase === 'number' && renderRef.current) {
      renderRef.current(((phase % 1) + 1) % 1);
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
