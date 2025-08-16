const pokemonTypeHex = {
  Acier: "#9ca3af", // Tailwind gray-400 color.
  Combat: "#b91c1c", // Tailwind red-700 color.
  Dragon: "#4338ca", // Tailwind indigo-700 color.
  Eau: "#3b82f6", // Tailwind blue-500 color.
  Électrik: "#f59e0b", // Tailwind yellow-400 color.
  Fée: "#f9a8d4", // Tailwind pink-300 color.
  Feu: "#ef4444", // Tailwind red-500 color.
  Glace: "#bfdbfe", // Tailwind blue-200 color.
  Insecte: "#34d399", // Tailwind green-400 color.
  Normal: "#9ca3af", // Tailwind gray-400 color.
  Plante: "#22c55e", // Tailwind green-500 color.
  Poison: "#a855f7", // Tailwind purple-500 color.
  Psy: "#c084fc", // Tailwind purple-400 color.
  Roche: "#ca8a04", // Tailwind yellow-600 color.
  Sol: "#a16207", // Tailwind yellow-700 color.
  Spectre: "#6b21a8", // Tailwind purple-700 color.
  Ténèbres: "#1f2937", // Tailwind gray-800 color.
  Vol: "#93c5fd" // Tailwind blue-300 color.
};

function HexagonStats({ stats, typeName }) {
  if (!stats) {
    return <p>Statistiques non disponibles</p>;
  }

  // Default color if type not found.
  let baseColor = "#3b82f6";

  // Use type-specific color if available.
  if (typeName) {
    const candidate = pokemonTypeHex[typeName];

    if (candidate) {
      baseColor = candidate;
    }
  }

  const fillOpacity = 0.28;
  const maxStat = 255;

  const statNames = ["PV", "Attaque", "Défense", "Att. Spé", "Déf. Spé", "Vitesse"];
  const statValues = [
    stats.hp || 0,
    stats.atk || 0,
    stats.def || 0,
    stats.spe_atk || 0,
    stats.spe_def || 0,
    stats.vit || 0
  ];

  // Chart center and max radius.
  const centerX = 150;
  const centerY = 150;
  const maxRadius = 100;

  // Get point coordinates based on stat value.
  function getPoint(index, value) {
    const angle = (Math.PI / 3) * index - Math.PI / 2;
    const radius = (value / maxStat) * maxRadius;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;

    return `${x},${y}`;
  }

  // For axis lines (no extra distance).
  function getAxisPoint(index) {
    const angle = (Math.PI / 3) * index - Math.PI / 2;
    const x = centerX + Math.cos(angle) * maxRadius;
    const y = centerY + Math.sin(angle) * maxRadius;

    return { x, y };
  }


  // Get label position outside the chart.
  function getLabelPoint(index) {
    const angle = (Math.PI / 3) * index - Math.PI / 2;
    const x = centerX + Math.cos(angle) * (maxRadius + 30);
    const y = centerY + Math.sin(angle) * (maxRadius + 30);

    return { x, y };
  }

  const statsPath = statValues.map((value, index) => getPoint(index, value)).join(" ");

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg width="300" height="300" className="overflow-visible">
          {/* Background grid polygons. */}
          {[0.2, 0.4, 0.6, 0.8, 1].map((scale, i) => (
            <polygon key={i} points={statValues.map((_, index) => getPoint(index, maxStat * scale)).join(" ")} fill="none" stroke="#e5e5e5" strokeWidth="1" />
          ))}

          {/* Axis lines */}
          {statValues.map((_, index) => {
            const point = getAxisPoint(index);

            return (
              <line key={index} x1={centerX} y1={centerY} x2={point.x} y2={point.y} stroke="#e5e5e5" strokeWidth="1" />
            );
          })}

          {/* Filled stats are. */}
          <polygon points={statsPath} fill={baseColor} fillOpacity={fillOpacity} stroke={baseColor} strokeWidth="2" />

          {/* Stat points. */}
          {statValues.map((value, index) => {
            const [x, y] = getPoint(index, value).split(",");

            return (
              <circle key={index} cx={x} cy={y} r="4" fill={baseColor} stroke="white" strokeWidth="2" />
            );
          })}

          {/* Labels and values. */}
          {statNames.map((name, index) => {
            const point = getLabelPoint(index);

            return (
              <g key={index}>
                <text x={point.x} y={point.y - 5} textAnchor="middle" className="text-xs font-semibold" fill="#374151">
                  {name}
                </text>

                <text x={point.x} y={point.y + 10} textAnchor="middle" className="text-sm font-bold" fill={baseColor}>
                  {statValues[index]}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

export default HexagonStats;
