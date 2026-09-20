/**
 * A stylised diagram of Goa — deliberately schematic rather than cartographic.
 * It exists to orient, not to claim precision, and it is labelled as such.
 */
const markers = [
  { x: 128, y: 96, label: "North Goa" },
  { x: 150, y: 178, label: "Panaji" },
  { x: 196, y: 214, label: "Estates" },
  { x: 156, y: 306, label: "South Goa" },
];

export function GoaMap({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox="0 0 320 420"
        fill="none"
        className="h-full w-full"
        role="img"
        aria-label="Stylised diagram of Goa showing BSM's areas of operation"
      >
        <defs>
          <pattern id="map-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M20 0H0V20" fill="none" stroke="#1a212c" strokeWidth="1" />
          </pattern>
          <linearGradient id="land" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#111925" />
            <stop offset="100%" stopColor="#0a0f16" />
          </linearGradient>
        </defs>

        <rect width="320" height="420" fill="url(#map-grid)" opacity="0.5" />

        {/* Landmass: schematic, west coast on the left */}
        <path
          d="M104 44 L152 30 L206 58 L236 112 L252 178 L244 250 L214 322 L172 382 L132 392 L110 352 L96 300 L88 250 L78 196 L84 140 Z"
          fill="url(#land)"
          stroke="#2a3340"
          strokeWidth="1.25"
        />

        {/* Coastline emphasis */}
        <path
          d="M104 44 L84 140 L78 196 L88 250 L96 300 L110 352 L132 392"
          stroke="#c8a45c"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.85"
        />

        {/* Sea hatching */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path
            key={i}
            d={`M16 ${70 + i * 56} C 40 ${58 + i * 56}, 52 ${86 + i * 56}, 74 ${72 + i * 56}`}
            stroke="#1a212c"
            strokeWidth="1"
            fill="none"
          />
        ))}

        {markers.map((m) => (
          <g key={m.label}>
            <circle cx={m.x} cy={m.y} r="14" fill="#c8a45c" opacity="0.08" />
            <circle cx={m.x} cy={m.y} r="3" fill="#c8a45c" />
            <line
              x1={m.x}
              y1={m.y}
              x2={m.x + 46}
              y2={m.y - 22}
              stroke="#2a3340"
              strokeWidth="1"
            />
            <text
              x={m.x + 50}
              y={m.y - 24}
              fill="#98a1b0"
              fontSize="9"
              letterSpacing="1.6"
              style={{ textTransform: "uppercase" }}
              fontFamily="var(--font-mono)"
            >
              {m.label}
            </text>
          </g>
        ))}

        <text
          x="16"
          y="404"
          fill="#656e7d"
          fontSize="8"
          letterSpacing="1.8"
          fontFamily="var(--font-mono)"
        >
          STYLISED — NOT TO SCALE
        </text>
      </svg>
    </div>
  );
}
