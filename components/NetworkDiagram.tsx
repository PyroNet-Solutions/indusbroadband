// Path of a connection from the Indus core to a home: animated dashed strands
// carry "light" between nodes. Pure SVG + CSS, so it costs no JavaScript.
export function NetworkDiagram() {
  const nodes = [
    { x: 70, y: 200, label: "Core" },
    { x: 230, y: 110, label: "POP" },
    { x: 230, y: 290, label: "POP" },
    { x: 400, y: 70, label: "Splitter" },
    { x: 400, y: 200, label: "Splitter" },
    { x: 400, y: 330, label: "Splitter" },
  ];
  const homes = [40, 110, 170, 230, 290, 360];
  return (
    <svg className="diagram" viewBox="0 0 560 400" role="img" aria-labelledby="nd-t">
      <title id="nd-t">Diagram: fiber runs from the Indus core through points of presence and splitters to each home.</title>
      <defs>
        <linearGradient id="nd-g" x1="0" x2="1"><stop offset="0" stopColor="#2B3990" /><stop offset="1" stopColor="#25AAE1" /></linearGradient>
      </defs>
      <g fill="none" stroke="url(#nd-g)" strokeWidth="2.5" strokeLinecap="round">
        <path className="strand" d="M70 200 C150 200 150 110 230 110" />
        <path className="strand" d="M70 200 C150 200 150 290 230 290" />
        <path className="strand" d="M230 110 C320 110 320 70 400 70" />
        <path className="strand" d="M230 110 C320 110 320 200 400 200" />
        <path className="strand" d="M230 290 C320 290 320 330 400 330" />
        {homes.map((y, i) => (
          <path key={y} className="strand" style={{ animationDelay: `${i * 0.2}s` }} d={`M${400} ${i < 2 ? 70 : i < 4 ? 200 : 330} C470 ${i < 2 ? 70 : i < 4 ? 200 : 330} 470 ${y} 520 ${y}`} />
        ))}
      </g>
      {nodes.map((n, i) => (
        <g key={i}>
          <circle className="pulse" cx={n.x} cy={n.y} r="14" fill="#25AAE1" opacity=".25" style={{ animationDelay: `${i * 0.3}s` }} />
          <circle cx={n.x} cy={n.y} r={i === 0 ? 10 : 7} fill="url(#nd-g)" />
          <text x={n.x} y={n.y + 32} textAnchor="middle">{n.label}</text>
        </g>
      ))}
      {homes.map((y) => <rect key={y} x="516" y={y - 8} width="16" height="16" rx="4" fill="currentColor" opacity=".7" />)}
      <text x="524" y="392" textAnchor="middle">Homes</text>
    </svg>
  );
}
