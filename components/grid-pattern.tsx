export function GridPattern({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeWidth = 1.5,
  strokeOpacity = 0.1,
  ...props
}: {
  width?: number
  height?: number
  x?: number
  y?: number
  strokeWidth?: number
  strokeOpacity?: number
  className?: string
  stroke?: string
}) {
  return (
    <svg aria-hidden="true" className="absolute inset-0 h-full w-full" {...props}>
      <defs>
        <pattern id="grid-pattern" width={width} height={height} patternUnits="userSpaceOnUse" x={x} y={y}>
          <path
            d={`M ${height} 0 V ${height} H 0 V 0 Z`}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeOpacity={strokeOpacity}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-pattern)" />
    </svg>
  )
}

// Also add a default export
const GridPatternComponent = GridPattern
export default GridPatternComponent

