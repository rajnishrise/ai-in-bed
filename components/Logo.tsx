/**
 * The AI in Bed mark: a crescent moon with a three-star constellation in its
 * hollow. Read it as the night sky, or as a tiny neural network.
 */
export function LogoMark({ size = 28, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden focusable="false" className={className}>
      <path d="M14.04 4.16A12 12 0 1 0 27.84 17.96A10 10 0 0 1 14.04 4.16Z" fill="var(--gold)" />
      <g stroke="var(--ink)" strokeWidth="0.9" strokeLinecap="round" opacity="0.7">
        <path d="M20.6 8.4 26.4 6.2M20.6 8.4 24.6 12.8M26.4 6.2 24.6 12.8" />
      </g>
      <circle cx="20.6" cy="8.4" r="1.45" fill="var(--ink)" />
      <circle cx="26.4" cy="6.2" r="1.15" fill="var(--ink)" />
      <circle cx="24.6" cy="12.8" r="1.25" fill="var(--ink)" />
    </svg>
  );
}

export function Wordmark() {
  return (
    <span className="wordmark">
      AI <em>in</em> Bed
    </span>
  );
}
