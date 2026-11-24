'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import { GitBranchIcon, Tick02Icon } from '@hugeicons/core-free-icons';

const vars = values => values;

const STEPS = [
  { label: 'Install', time: '8s' },
  { label: 'Build', time: '12s' },
  { label: 'Test', time: '48s' },
  { label: 'Deploy', time: '9s' }
];

const EfficiencyVisual = () => (
  <div className="magic-bento__flow" style={vars({ '--n': STEPS.length })}>
    <div className="magic-bento__flow-trigger magic-bento__tile">
      <span className="magic-bento__flow-glyph">
        <HugeiconsIcon icon={GitBranchIcon} size={15} strokeWidth={1.8} />
      </span>
      <span className="magic-bento__flow-copy">
        <span className="magic-bento__flow-name">Push to main</span>
        <span className="magic-bento__flow-meta magic-bento__flow-hash">a1c9f3e</span>
      </span>
    </div>
    <ol className="magic-bento__steps magic-bento__well">
      <span className="magic-bento__rail" aria-hidden="true">
        <span className="magic-bento__rail-fill" />
      </span>
      {STEPS.map((step, index) => (
        <li key={step.label} className="magic-bento__step" style={vars({ '--i': index })}>
          <span className="magic-bento__status">
            <span className="magic-bento__pending" />
            <span className="magic-bento__spinner" />
            <span className="magic-bento__done">
              <HugeiconsIcon icon={Tick02Icon} size={11} strokeWidth={2.6} />
            </span>
          </span>
          {step.label}
          <span className="magic-bento__step-time">{step.time}</span>
        </li>
      ))}
    </ol>
  </div>
);

export default EfficiencyVisual;
