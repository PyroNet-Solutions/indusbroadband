// Renders both theme variants; CSS shows the one matching :root[data-theme].
// Fixed aspect ratio (280:96) prevents layout shift.
export function Logo({ height = 40, className = "" }: { height?: number; className?: string }) {
  const width = Math.round((height * 280) / 96);
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={`logo logo-light ${className}`} src="/brand/logo-light.svg" alt="Indus Broadband" width={width} height={height} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={`logo logo-dark ${className}`} src="/brand/logo-dark.svg" alt="Indus Broadband" width={width} height={height} />
    </>
  );
}
