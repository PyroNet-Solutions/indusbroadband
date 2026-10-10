// Section divider: three layered water waves drifting at different speeds.
// Pure SVG + CSS (no JS); the paths tile seamlessly over two widths.
const wave = "M0 30 C150 10 300 50 450 30 S750 10 900 30 S1200 50 1350 30 S1650 10 1800 30 V60 H0 Z";

export function RiverWave({ flip = false }: { flip?: boolean }) {
  return (
    <div className={`river-wave${flip ? " flip" : ""}`} aria-hidden="true">
      <svg viewBox="0 0 900 60" preserveAspectRatio="none">
        <path className="w1" d={wave} />
        <path className="w2" d={wave} />
        <path className="w3" d={wave} />
      </svg>
    </div>
  );
}
