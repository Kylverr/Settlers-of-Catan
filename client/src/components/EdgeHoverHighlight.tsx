import type { Edge } from "../models/Edge";
import type { Vertex } from "../models/Vertex";

export function EdgeHoverHighlight({
  hoveredEdge,
  vertices,
  color,
}: {
  hoveredEdge: Edge | null;
  vertices: Vertex[];
  color: string;
}) {
  if (!hoveredEdge) return null;

  const vA = vertices.find((v) => v.id === hoveredEdge.vertexA)!;
  const vB = vertices.find((v) => v.id === hoveredEdge.vertexB)!;

  const x = (vA.x + vB.x) / 2;
  const y = (vA.y + vB.y) / 2;

  return (
    <rect
      x={x - 1}
      y={y - 2.5}
      width={2}
      height={5}
      fill={color}
      stroke={color}
      strokeWidth={0.3}
      opacity={0.7}
      pointerEvents="none"
      transform={`rotate(${(Math.atan2(vB.y - vA.y, vB.x - vA.x) * 180) / Math.PI + 90} ${x} ${y})`}
    />
  );
}
