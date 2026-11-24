'use client';

const vars = values => values;

const BARS = [42, 58, 49, 71, 63, 88, 76];

const OverviewVisual = () => (
  <div className="magic-bento__bars">
    <div className="magic-bento__figure">
      <span className="magic-bento__figure-value">$48.2k</span>
      <span className="magic-bento__figure-note">Weekly</span>
    </div>
    <div className="magic-bento__bars-plot">
      {BARS.map((height, index) => (
        <span
          key={index}
          className="magic-bento__bar"
          data-peak={height === Math.max(...BARS) ? '' : undefined}
          style={vars({ '--h': height / 100, '--i': index })}
        />
      ))}
    </div>
  </div>
);

export default OverviewVisual;
