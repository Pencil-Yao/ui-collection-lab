'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import { FingerPrintIcon, Key01Icon } from '@hugeicons/core-free-icons';

const vars = values => values;

const SETTINGS = [
  { icon: Key01Icon, label: 'SSO' },
  { icon: FingerPrintIcon, label: '2FA' }
];

const ProtectionVisual = () => (
  <div className="magic-bento__shield">
    {SETTINGS.map((setting, index) => (
      <div key={setting.label} className="magic-bento__setting magic-bento__tile">
        <HugeiconsIcon icon={setting.icon} size={14} strokeWidth={1.8} />
        <span className="magic-bento__setting-label">{setting.label}</span>
        <span className="magic-bento__switch" style={vars({ '--i': index })} />
      </div>
    ))}
  </div>
);

export default ProtectionVisual;
