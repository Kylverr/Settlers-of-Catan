import type { Tile } from "./models/Tile";
import type { Vertex } from "./models/Vertex";
import { pointyHexCorner, hexToPixel } from "./utils/hexMath";

export function VertexHoverHighlight({
  hoveredVertex,
  tiles,
}: {
  hoveredVertex: Vertex | null;
  tiles: Tile[];
}) {
  if (!hoveredVertex) return null;
  const tile = tiles.find((t) => t.id === hoveredVertex.tileId);
  if (!tile) return null;

  const { x: centerX, y: centerY } = hexToPixel(tile);
  const { x, y } = pointyHexCorner(
    centerX,
    centerY,
    10,
    hoveredVertex.cornerIndex
  );

  return (
    <rect
      x={x - 1.5}
      y={y - 1.5}
      width={3}
      height={3}
      fill="orange"
      stroke="orange"
      strokeWidth={0.3}
      opacity={0.7}
      pointerEvents="none"
    />
  );
}
