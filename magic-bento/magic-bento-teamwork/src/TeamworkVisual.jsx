'use client';

const vars = values => values;

const ARROW = (
  <svg width="16" height="18" viewBox="0 0 16 18" aria-hidden="true">
    <path
      d="M2.2 1.6 13.4 9.9c.5.4.3 1.2-.4 1.3l-4.6.6-2.2 4.2c-.3.6-1.2.5-1.4-.1L1.2 2.4c-.2-.6.5-1.1 1-.8Z"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
  </svg>
);

const TeamworkVisual = () => (
  <div className="magic-bento__collab magic-bento__well">
    <span className="magic-bento__doc-title">Launch plan</span>
    <div className="magic-bento__lines">
      <span className="magic-bento__line" style={vars({ '--w': '92%' })} />
      <span className="magic-bento__line" style={vars({ '--w': '78%' })} />
      <span className="magic-bento__line" style={vars({ '--w': '86%' })} />
      <span className="magic-bento__line" style={vars({ '--w': '44%' })} />
      <span className="magic-bento__line magic-bento__line--gap" style={vars({ '--w': '88%' })} />
      <span className="magic-bento__line" style={vars({ '--w': '70%' })}>
        <span className="magic-bento__selection" style={vars({ '--from': '18%', '--span': '58%' })}>
          <span className="magic-bento__caret" />
        </span>
      </span>
      <span className="magic-bento__line" style={vars({ '--w': '82%' })} />
    </div>
    <span
      className="magic-bento__cursor magic-bento__cursor--primary"
      style={vars({ '--x': '58%', '--y': '52%', '--i': 0, '--path': 'magic-bento-path-a' })}
    >
      {ARROW}
      <span className="magic-bento__cursor-name">Maya</span>
    </span>
    <span
      className="magic-bento__cursor magic-bento__cursor--secondary"
      style={vars({ '--x': '30%', '--y': '24%', '--i': 1, '--path': 'magic-bento-path-b' })}
    >
      {ARROW}
      <span className="magic-bento__cursor-name">Leo</span>
    </span>
  </div>
);

export default TeamworkVisual;
