/**
 * Custom geometric SVG mark for the Pixelforge hero.
 * Animated lime accent on the central pixel.
 */
export function ForgeMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 240"
      className={className}
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="forge-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity="0.4" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0.05" />
        </linearGradient>
        <filter id="forge-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* outer ring of 12 small squares */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const r = 100;
        const x = 120 + Math.cos(angle) * r - 6;
        const y = 120 + Math.sin(angle) * r - 6;
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width="12"
            height="12"
            rx="1"
            fill="url(#forge-grad)"
            stroke="currentColor"
            strokeOpacity="0.3"
            strokeWidth="1"
          >
            <animate
              attributeName="opacity"
              values="0.3;1;0.3"
              dur="3s"
              begin={`${i * 0.15}s`}
              repeatCount="indefinite"
            />
          </rect>
        );
      })}

      {/* middle ring */}
      {Array.from({ length: 4 }).map((_, i) => {
        const angle = (i / 4) * Math.PI * 2 + Math.PI / 4;
        const r = 55;
        const x = 120 + Math.cos(angle) * r - 8;
        const y = 120 + Math.sin(angle) * r - 8;
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width="16"
            height="16"
            rx="2"
            fill="currentColor"
            fillOpacity="0.6"
          />
        );
      })}

      {/* central glowing pixel — acid lime */}
      <rect
        x="108"
        y="108"
        width="24"
        height="24"
        rx="3"
        fill="rgb(197 255 63)"
        filter="url(#forge-glow)"
      >
        <animate
          attributeName="fill-opacity"
          values="0.7;1;0.7"
          dur="2s"
          repeatCount="indefinite"
        />
      </rect>

      {/* corner brackets */}
      <path
        d="M 10 30 L 10 10 L 30 10"
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M 210 10 L 230 10 L 230 30"
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M 230 210 L 230 230 L 210 230"
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M 30 230 L 10 230 L 10 210"
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  );
}
