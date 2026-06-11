/**
 * The ReachUp arch — SVG recreation of the brand icon.
 * Used as a decorative element throughout the page.
 */
export default function ReachUpArch({
  className = "",
  color = "#C9B585",
  strokeWidth = 8,
}: {
  className?: string;
  color?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 120 160"
      fill="none"
      className={className}
    >
      {/* Outer arch */}
      <path
        d="M20 160 L20 70 Q20 20 60 20 Q100 20 100 70 L100 160"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        fill="none"
      />
      {/* Center line */}
      <line
        x1="60"
        y1="160"
        x2="60"
        y2="75"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}
