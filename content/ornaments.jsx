// Simple geometric ornaments - no faux-illuminated illustration.
// Hairline rules with a centered diamond, corner brackets, drop caps.

const RuleDiamond = ({ width = "100%", color = "var(--rule)", accent = "var(--gilt-dim)" }) => (
  <svg width={width} height="14" viewBox="0 0 1000 14" preserveAspectRatio="none" style={{ display: "block" }}>
    <line x1="0"    y1="7" x2="470" y2="7" stroke={color} strokeWidth="1" vectorEffect="non-scaling-stroke"/>
    <line x1="530"  y1="7" x2="1000" y2="7" stroke={color} strokeWidth="1" vectorEffect="non-scaling-stroke"/>
    <g transform="translate(500 7)">
      <path d="M 0 -5 L 6 0 L 0 5 L -6 0 Z" fill="none" stroke={accent} strokeWidth="1" vectorEffect="non-scaling-stroke"/>
      <circle r="1.4" fill={accent}/>
    </g>
  </svg>
);

const CornerBrackets = ({ size = 18, color = "var(--gilt-dim)", inset = 8 }) => {
  const s = size;
  const Bracket = ({ style }) => (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} style={{ position: "absolute", ...style }}>
      <path d={`M 0 ${s} L 0 0 L ${s} 0`} fill="none" stroke={color} strokeWidth="1" vectorEffect="non-scaling-stroke"/>
    </svg>
  );
  return (
    <>
      <Bracket style={{ top: inset, left: inset }} />
      <Bracket style={{ top: inset, right: inset, transform: "scaleX(-1)" }} />
      <Bracket style={{ bottom: inset, left: inset, transform: "scaleY(-1)" }} />
      <Bracket style={{ bottom: inset, right: inset, transform: "scale(-1,-1)" }} />
    </>
  );
};

// Decorative leaf-glyph between section headings - drawn from primitives only.
const SectionGlyph = ({ size = 22, color = "var(--gilt)" }) => (
  <svg width={size} height={size} viewBox="0 0 22 22" style={{ display: "inline-block", verticalAlign: "middle" }}>
    <g stroke={color} strokeWidth="1" fill="none" vectorEffect="non-scaling-stroke">
      <circle cx="11" cy="11" r="3"/>
      <path d="M 11 1 L 11 6 M 11 16 L 11 21 M 1 11 L 6 11 M 16 11 L 21 11"/>
      <path d="M 4 4 L 7 7 M 15 7 L 18 4 M 4 18 L 7 15 M 15 15 L 18 18"/>
    </g>
    <circle cx="11" cy="11" r="0.9" fill={color}/>
  </svg>
);

// Status sigil - small filled mark whose color encodes status.
const StatusSigil = ({ status }) => {
  const map = {
    active:    { c: "var(--gilt)",       label: "active"    },
    concluded: { c: "var(--blood)",      label: "concluded" },
  };
  const { c } = map[status] || map.active;
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
      <path d="M 5 0 L 10 5 L 5 10 L 0 5 Z" fill={c} stroke={c} strokeWidth="0.8"/>
    </svg>
  );
};

Object.assign(window, { RuleDiamond, CornerBrackets, SectionGlyph, StatusSigil });
