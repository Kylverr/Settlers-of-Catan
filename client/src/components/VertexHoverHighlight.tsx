import type { Vertex } from "../models/Vertex";

export function VertexHoverHighlight({
  hoveredVertex,
  color
}: {
  hoveredVertex: Vertex | null;
  color: string;
}) {
  if (!hoveredVertex) return null;

  const { x, y } = {x: hoveredVertex.x, y: hoveredVertex.y};

  return (
    <rect
      x={x - 1.5}
      y={y - 1.5}
      width={3}
      height={3}
      fill={color}
      stroke={color}
      strokeWidth={0.3}
      opacity={0.7}
      pointerEvents="none"
    />
  );
}
