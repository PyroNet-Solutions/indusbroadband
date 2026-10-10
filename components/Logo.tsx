// Renders both theme variants; CSS shows the one matching :root[data-theme].
// Fixed aspect ratio (1121:748) prevents layout shift.
export function Logo({ height = 48, className = "" }: { height?: number; className?: string }) {
  const width = Math.round((height * 1121) / 748);
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={`logo logo-light ${className}`} src="/brand/logo-light.png" alt="Indus Broadband" width={width} height={height} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={`logo logo-dark ${className}`} src="/brand/logo-dark.png" alt="Indus Broadband" width={width} height={height} />
    </>
  );
}
