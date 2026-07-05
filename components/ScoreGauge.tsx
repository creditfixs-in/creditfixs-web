/**
 * Decorative credit-score gauge (SVG, no JS). Shows a 750+ "loan-ready" arc.
 */
export default function ScoreGauge({ label }: { label: string }) {
  return (
    <div className="relative mx-auto w-full max-w-sm select-none">
      <svg viewBox="0 0 200 130" role="img" aria-label={`${label}: 750+`}>
        <defs>
          <linearGradient id="gaugeTrack" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="45%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>
        {/* track */}
        <path
          d="M 20 115 A 80 80 0 0 1 180 115"
          fill="none"
          stroke="url(#gaugeTrack)"
          strokeWidth="14"
          strokeLinecap="round"
          opacity="0.25"
        />
        {/* progress: ~82% of the arc */}
        <path
          d="M 20 115 A 80 80 0 0 1 180 115"
          fill="none"
          stroke="url(#gaugeTrack)"
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray="251.3"
          strokeDashoffset="45"
        />
        {/* needle dot */}
        <circle cx="160" cy="55" r="7" fill="#10b981" stroke="#fff" strokeWidth="3" />
        <text
          x="100"
          y="92"
          textAnchor="middle"
          fontSize="34"
          fontWeight="800"
          fill="currentColor"
        >
          750+
        </text>
        <text
          x="100"
          y="112"
          textAnchor="middle"
          fontSize="11"
          fontWeight="500"
          fill="currentColor"
          opacity="0.7"
        >
          {label}
        </text>
      </svg>
    </div>
  );
}
