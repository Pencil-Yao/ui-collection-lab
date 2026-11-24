'use client';

import './AnimatedCircularProgressBar.css';

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export function AnimatedCircularProgressBar({
  max = 100,
  min = 0,
  value = 0,
  gaugePrimaryColor = '#d4d4d8',
  gaugeSecondaryColor = 'rgba(255, 255, 255, 0.1)',
  valueColor = '#f4f4f5',
  size = 160,
  transitionLength = '1s',
  delay = '0s',
  unit = '',
  className = ''
}) {
  const circumference = 2 * Math.PI * 45;
  const percentPx = circumference / 100;
  const span = max - min || 1;
  const currentPercent = clamp(Math.round(((value - min) / span) * 100), 0, 100);

  return (
    <div
      className={['acp', className].filter(Boolean).join(' ')}
      style={{
        '--acp-size': typeof size === 'number' ? `${size}px` : size,
        '--acp-value-color': valueColor,
        '--circle-size': '100px',
        '--circumference': circumference,
        '--percent-to-px': `${percentPx}px`,
        '--gap-percent': '5',
        '--offset-factor': '0',
        '--transition-length': transitionLength,
        '--transition-step': '200ms',
        '--delay': delay,
        '--percent-to-deg': '3.6deg',
        transform: 'translateZ(0)'
      }}
    >
      <svg fill="none" className="acp__svg" strokeWidth="2" viewBox="0 0 100 100" aria-hidden="true">
        {currentPercent <= 90 && currentPercent >= 0 && (
          <circle
            cx="50"
            cy="50"
            r="45"
            strokeWidth="10"
            strokeDashoffset="0"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="acp__arc acp__arc--secondary"
            style={{
              stroke: gaugeSecondaryColor,
              '--stroke-percent': 90 - currentPercent,
              '--offset-factor-secondary': 'calc(1 - var(--offset-factor))',
              strokeDasharray: 'calc(var(--stroke-percent) * var(--percent-to-px)) var(--circumference)',
              transform:
                'rotate(calc(1turn - 90deg - (var(--gap-percent) * var(--percent-to-deg) * var(--offset-factor-secondary)))) scaleY(-1)',
              transition: 'all var(--transition-length) ease var(--delay)',
              transformOrigin: 'calc(var(--circle-size) / 2) calc(var(--circle-size) / 2)'
            }}
          />
        )}
        <circle
          cx="50"
          cy="50"
          r="45"
          strokeWidth="10"
          strokeDashoffset="0"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="acp__arc acp__arc--primary"
          style={{
            stroke: gaugePrimaryColor,
            '--stroke-percent': currentPercent,
            strokeDasharray: 'calc(var(--stroke-percent) * var(--percent-to-px)) var(--circumference)',
            transition:
              'var(--transition-length) ease var(--delay),stroke var(--transition-length) ease var(--delay)',
            transitionProperty: 'stroke-dasharray,transform',
            transform: 'rotate(calc(-90deg + var(--gap-percent) * var(--offset-factor) * var(--percent-to-deg)))',
            transformOrigin: 'calc(var(--circle-size) / 2) calc(var(--circle-size) / 2)'
          }}
        />
      </svg>
      <span className="acp__value" data-current-value={currentPercent}>
        {currentPercent}
        {unit}
      </span>
    </div>
  );
}

export default AnimatedCircularProgressBar;
