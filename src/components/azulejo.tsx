interface AzulejoPatternProps {
  /** Identificador único do `<pattern>` — obrigatório se houver mais do que um por página. */
  id?: string;
  className?: string;
  /** Lado do ladrilho em px. */
  tile?: number;
}

/**
 * Padrão de azulejo português desenhado em SVG, herdando a cor via `currentColor`.
 * Serve de textura de fundo — decorativo, escondido de leitores de ecrã.
 */
export function AzulejoPattern({
  id = "azulejo",
  className,
  tile = 72,
}: AzulejoPatternProps) {
  const half = tile / 2;

  return (
    <svg aria-hidden="true" className={className}>
      <defs>
        <pattern
          id={id}
          width={tile}
          height={tile}
          patternUnits="userSpaceOnUse"
        >
          <g
            fill="none"
            stroke="currentColor"
            strokeWidth="1.1"
            strokeLinecap="round"
          >
            {/* Losango central */}
            <path
              d={`M${half} 6 L${tile - 6} ${half} L${half} ${tile - 6} L6 ${half} Z`}
            />
            {/* Quadrifólio inscrito */}
            <path
              d={`M${half} ${half - 15}
                  a15 15 0 0 1 15 15
                  a15 15 0 0 1 -15 15
                  a15 15 0 0 1 -15 -15
                  a15 15 0 0 1 15 -15 Z`}
              opacity="0.7"
            />
            <path d={`M${half} ${half - 8} L${half} ${half + 8}`} opacity="0.5" />
            <path d={`M${half - 8} ${half} L${half + 8} ${half}`} opacity="0.5" />
            {/* Arcos de canto, que fecham a malha com os ladrilhos vizinhos */}
            <path d={`M0 12 A12 12 0 0 0 12 0`} opacity="0.55" />
            <path d={`M${tile - 12} 0 A12 12 0 0 0 ${tile} 12`} opacity="0.55" />
            <path
              d={`M${tile} ${tile - 12} A12 12 0 0 0 ${tile - 12} ${tile}`}
              opacity="0.55"
            />
            <path d={`M12 ${tile} A12 12 0 0 0 0 ${tile - 12}`} opacity="0.55" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
