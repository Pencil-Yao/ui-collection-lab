import { useMemo, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  AnalyticsUpIcon,
  DashboardSquare01Icon,
  PlugSocketIcon,
  SecurityCheckIcon,
  UserGroupIcon,
  WorkflowSquare03Icon
} from '@hugeicons/core-free-icons';

import MagicBento from '../magic-bento/src/MagicBento';

const glyph = icon => <HugeiconsIcon icon={icon} size={16} strokeWidth={1.8} />;

const FEATURE_ITEMS = [
  { label: 'Insights', title: 'Analytics', description: 'Track user behavior', icon: glyph(AnalyticsUpIcon), visual: 'analytics' },
  { label: 'Overview', title: 'Dashboard', description: 'Centralized data view', icon: glyph(DashboardSquare01Icon), visual: 'dashboard' },
  {
    label: 'Teamwork',
    title: 'Collaboration',
    description: 'Work together seamlessly',
    icon: glyph(UserGroupIcon),
    visual: 'collaboration'
  },
  {
    label: 'Efficiency',
    title: 'Automation',
    description: 'Streamline workflows',
    icon: glyph(WorkflowSquare03Icon),
    visual: 'automation'
  },
  { label: 'Connectivity', title: 'Integration', description: 'Connect favorite tools', icon: glyph(PlugSocketIcon), visual: 'integration' },
  { label: 'Protection', title: 'Security', description: 'Enterprise-grade protection', icon: glyph(SecurityCheckIcon), visual: 'security' }
];

const GLOWS = [
  { value: '', label: 'Default' },
  { value: '#f97316', label: 'Ember' },
  { value: '#38bdf8', label: 'Ocean' },
  { value: '#34d399', label: 'Mint' },
  { value: '#a78bfa', label: 'Violet' }
];

const Toggles = ({ settings, onChange }) => {
  const entries = [
    ['enableBorderGlow', 'Border glow'],
    ['enableSpotlight', 'Spotlight'],
    ['enableStars', 'Stars'],
    ['enableTilt', 'Tilt'],
    ['enableMagnetism', 'Magnetism'],
    ['clickEffect', 'Click wave'],
    ['textAutoHide', 'Auto-hide text'],
    ['intro', 'Intro']
  ];

  return (
    <div className="lab-toggles">
      {entries.map(([key, label]) => (
        <label key={key} className="lab-toggle">
          <input type="checkbox" checked={settings[key]} onChange={event => onChange(key, event.target.checked)} />
          <span>{label}</span>
        </label>
      ))}
    </div>
  );
};

const App = () => {
  const [theme, setTheme] = useState('dark');
  const [glowColor, setGlowColor] = useState('');
  const [settings, setSettings] = useState({
    enableBorderGlow: true,
    enableSpotlight: true,
    enableStars: false,
    enableTilt: false,
    enableMagnetism: false,
    clickEffect: true,
    textAutoHide: true,
    intro: true
  });

  const update = (key, value) => setSettings(prev => ({ ...prev, [key]: value }));

  const computedGlow = useMemo(() => (glowColor ? glowColor : undefined), [glowColor]);

  return (
    <div className="lab" data-theme={theme}>
      <header className="lab-header">
        <div>
          <p className="lab-kicker">UI Collection Lab</p>
          <h1>MagicBento</h1>
          <p className="lab-sub">
            An interactive bento grid with cursor spotlight, border glow, stars, tilt and a click ripple. Shell lives in
            <code> magic-bento/src</code>, card visuals in <code>magic-bento/magic-bento-*</code>.
          </p>
        </div>

        <div className="lab-controls">
          <label className="lab-field">
            <span>Theme</span>
            <select value={theme} onChange={event => setTheme(event.target.value)}>
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </select>
          </label>
          <label className="lab-field">
            <span>Glow</span>
            <select value={glowColor} onChange={event => setGlowColor(event.target.value)}>
              {GLOWS.map(option => (
                <option key={option.label} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </header>

      <Toggles settings={settings} onChange={update} />

      <main className="lab-stage">
        {FEATURE_ITEMS.map(item => (
          <div key={item.title} className="lab-row">
            <MagicBento
              theme={theme}
              glowColor={computedGlow}
              items={[{ ...item, colSpan: 2, rowSpan: 2 }]}
              columns={2}
              rowHeight={200}
              gap={12}
              radius={20}
              spotlightRadius={300}
              particleCount={24}
              {...settings}
            />
          </div>
        ))}
      </main>
    </div>
  );
};

export default App;
