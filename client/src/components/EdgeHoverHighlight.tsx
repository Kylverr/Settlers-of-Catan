import type { Edge } from "../models/Edge";
import type { Tile } from "../models/Tile";
import { hexToPixel, pointyHexEdge } from "../utils/hexMath";

export function EdgeHoverHighlight({
  hoveredEdge,
  tiles,
}: {
  hoveredEdge: Edge | null;
  tiles: Tile[];
}) {
  if (!hoveredEdge) return null;
  const tile = tiles.find((t) => t.id === hoveredEdge.tileId);
  if (!tile) return null;

  const { x: centerX, y: centerY } = hexToPixel(tile);
  const { x, y } = pointyHexEdge(centerX, centerY, 10, hoveredEdge.edgeIndex);

  return (
    <rect
      x={x - 1}
      y={y - 2.5}
      width={2}
      height={5}
      fill="orange"
      stroke="orange"
      strokeWidth={0.3}
      opacity={0.7}
      pointerEvents="none"
      transform={`rotate(${(hoveredEdge.edgeIndex - 1) * 60} ${x} ${y})`}
    />
  );
}
