export function LogoMark({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" aria-hidden="true" className="shrink-0">
      <rect width="22" height="22" rx="6" fill="#3C4A96" />
      <circle cx="11" cy="11" r="2" fill="white" />
      <circle cx="11" cy="11" r="4.6" stroke="white" strokeOpacity="0.78" fill="none" />
      <circle cx="11" cy="11" r="7.3" stroke="white" strokeOpacity="0.35" fill="none" />
    </svg>
  );
}
