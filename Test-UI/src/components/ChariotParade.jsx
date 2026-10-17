/**
 * Decorative Kurukshetra rath (chariot) looping across the bottom edge.
 * Visual only — no product copy.
 */
export default function ChariotParade() {
  return (
    <div className="chariot-parade" aria-hidden="true">
      <div className="chariot-track">
        <div className="chariot-runner">
          <RathSVG />
        </div>
      </div>
      <div className="chariot-ground-line" />
    </div>
  );
}

function RathSVG() {
  return (
    <svg
      className="chariot-svg"
      viewBox="0 0 280 90"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      {/* Dust trail */}
      <g className="chariot-dust" opacity="0.45">
        <circle cx="18" cy="78" r="2.2" fill="#e8c48a" />
        <circle cx="28" cy="80" r="1.5" fill="#c48a3a" />
        <circle cx="38" cy="77" r="1.8" fill="#e8c48a" />
        <circle cx="48" cy="81" r="1.2" fill="#d4a05a" />
      </g>

      {/* Lead horse */}
      <g transform="translate(52, 42)">
        <ellipse cx="38" cy="22" rx="28" ry="12" fill="#8a5a32" />
        <ellipse cx="62" cy="14" rx="12" ry="8" fill="#9a6a3e" />
        <path d="M70 12 L82 6 L80 14 Z" fill="#7a4a28" />
        <rect x="22" y="30" width="4" height="18" rx="1.5" fill="#5c3a20" className="leg-a" />
        <rect x="34" y="30" width="4" height="18" rx="1.5" fill="#6a4428" className="leg-b" />
        <rect x="44" y="30" width="4" height="18" rx="1.5" fill="#5c3a20" className="leg-a" />
        <rect x="54" y="30" width="4" height="18" rx="1.5" fill="#6a4428" className="leg-b" />
        {/* Mane */}
        <path d="M54 6 Q60 0 68 8" stroke="#c45c4a" strokeWidth="3" strokeLinecap="round" />
        {/* Eye */}
        <circle cx="70" cy="12" r="1.4" fill="#1a100a" />
        {/* Rein */}
        <path d="M78 16 Q100 20 118 28" stroke="#c48a3a" strokeWidth="1.5" fill="none" />
      </g>

      {/* Second horse (slightly behind) */}
      <g transform="translate(28, 46)" opacity="0.9">
        <ellipse cx="32" cy="20" rx="24" ry="10" fill="#6b4428" />
        <ellipse cx="52" cy="13" rx="10" ry="7" fill="#7a5230" />
        <rect x="18" y="28" width="3.5" height="16" rx="1.5" fill="#4a3018" className="leg-b" />
        <rect x="28" y="28" width="3.5" height="16" rx="1.5" fill="#5c3a20" className="leg-a" />
        <rect x="38" y="28" width="3.5" height="16" rx="1.5" fill="#4a3018" className="leg-b" />
        <rect x="46" y="28" width="3.5" height="16" rx="1.5" fill="#5c3a20" className="leg-a" />
      </g>

      {/* Chariot body */}
      <g transform="translate(148, 28)">
        {/* Platform */}
        <rect x="0" y="28" width="88" height="10" rx="2" fill="#5c3a20" />
        <rect x="4" y="8" width="78" height="24" rx="3" fill="#8a5520" />
        <rect x="8" y="12" width="70" height="16" rx="2" fill="#c48a3a" />
        {/* Banner pole */}
        <rect x="72" y="-18" width="3" height="48" rx="1" fill="#e8c48a" />
        <path d="M75 -16 L98 -8 L75 4 Z" fill="#c45c4a" className="banner-flap" />
        {/* Warrior silhouette */}
        <circle cx="44" cy="2" r="6" fill="#2a1c12" />
        <rect x="38" y="8" width="12" height="16" rx="2" fill="#3a2a1c" />
        {/* Bow */}
        <path d="M54 6 Q68 -2 66 18" stroke="#e8c48a" strokeWidth="2" fill="none" />
        {/* Decorative trim */}
        <rect x="10" y="14" width="12" height="4" rx="1" fill="#f0c878" opacity="0.7" />
        <rect x="28" y="14" width="12" height="4" rx="1" fill="#f0c878" opacity="0.5" />
      </g>

      {/* Chariot wheels */}
      <g className="wheel-spin" transform="translate(168, 62)">
        <circle cx="0" cy="0" r="14" fill="#4a3018" stroke="#c48a3a" strokeWidth="3" />
        <circle cx="0" cy="0" r="4" fill="#e8c48a" />
        <line x1="-10" y1="0" x2="10" y2="0" stroke="#d4a05a" strokeWidth="2" />
        <line x1="0" y1="-10" x2="0" y2="10" stroke="#d4a05a" strokeWidth="2" />
        <line x1="-7" y1="-7" x2="7" y2="7" stroke="#c48a3a" strokeWidth="1.5" />
        <line x1="7" y1="-7" x2="-7" y2="7" stroke="#c48a3a" strokeWidth="1.5" />
      </g>
      <g className="wheel-spin" transform="translate(218, 62)">
        <circle cx="0" cy="0" r="14" fill="#4a3018" stroke="#c48a3a" strokeWidth="3" />
        <circle cx="0" cy="0" r="4" fill="#e8c48a" />
        <line x1="-10" y1="0" x2="10" y2="0" stroke="#d4a05a" strokeWidth="2" />
        <line x1="0" y1="-10" x2="0" y2="10" stroke="#d4a05a" strokeWidth="2" />
        <line x1="-7" y1="-7" x2="7" y2="7" stroke="#c48a3a" strokeWidth="1.5" />
        <line x1="7" y1="-7" x2="-7" y2="7" stroke="#c48a3a" strokeWidth="1.5" />
      </g>
    </svg>
  );
}
