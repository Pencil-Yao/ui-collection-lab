'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import { FigmaIcon, GithubIcon, NotionIcon, SlackIcon, SparklesIcon } from '@hugeicons/core-free-icons';

const vars = values => values;

const APPS = [
  { icon: SlackIcon, x: '17%', y: '24%' },
  { icon: GithubIcon, x: '83%', y: '24%' },
  { icon: FigmaIcon, x: '17%', y: '78%' },
  { icon: NotionIcon, x: '83%', y: '78%' }
];

const ConnectivityVisual = () => (
  <div className="magic-bento__hub">
    <svg className="magic-bento__hub-links" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      {APPS.map(app => (
        <line key={app.x + app.y} x1={parseFloat(app.x)} y1={parseFloat(app.y)} x2="50" y2="51" pathLength="1" />
      ))}
    </svg>
    {APPS.map((app, index) => (
      <span
        key={`packet-${index}`}
        className="magic-bento__packet"
        style={vars({ '--x': app.x, '--y': app.y, '--i': index })}
      />
    ))}
    {APPS.map((app, index) => (
      <span
        key={app.x + app.y}
        className="magic-bento__hub-node magic-bento__tile"
        style={vars({ '--x': app.x, '--y': app.y, '--s': '26px', '--i': index + 1 })}
      >
        <HugeiconsIcon icon={app.icon} size={14} strokeWidth={1.8} />
      </span>
    ))}
    <span
      className="magic-bento__hub-node magic-bento__tile"
      style={vars({ '--x': '50%', '--y': '51%', '--s': '34px', '--i': 0 })}
    >
      <HugeiconsIcon icon={SparklesIcon} size={17} strokeWidth={1.8} />
    </span>
  </div>
);

export default ConnectivityVisual;
