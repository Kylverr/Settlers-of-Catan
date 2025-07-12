import HexTile from "./HexTile";
import { HexGrid, Layout } from "react-hexgrid";
import {
  initializeTiles,
  initializeVertices,
  initializeEdges,
} from "../game/initializeBoard";
import { useState } from "react";
import type { Tile } from "../models/Tile";
import type { Vertex } from "../models/Vertex";
import type { Edge } from "../models/Edge";
import { VertexHoverHighlight } from "./VertexHoverHighlight";
import { EdgeHoverHighlight } from "./EdgeHoverHighlight";
import { hexToPixel, pointyHexCorner, pointyHexEdge } from "../utils/hexMath";

function Board() {
  // Initialize board once
  const [tiles, setTiles] = useState<Tile[]>(() => initializeTiles());

  // Initialize vertex and edge positions
  const [vertices, setVertices] = useState<Vertex[]>(() =>
    initializeVertices(tiles)
  );
  const [edges, setEdges] = useState<Edge[]>(() => initializeEdges(tiles));

  // Create a state to handle hovering over a circle
  const [hoveredVertex, setHoveredVertex] = useState<Vertex | null>(null);
  const [hoveredEdge, setHoveredEdge] = useState<Edge | null>(null);

  return (
    <div>
      <HexGrid width={1200} height={800} viewBox="-50 -50 100 100">
        {/* Grid with manually inserted hexagons */}
        <Layout
          size={{ x: 10, y: 10 }}
          flat={false}
          spacing={1.0}
          origin={{ x: 0, y: 0 }}
        >
          {/* Draw hexes */}
          {tiles.map((tile) => (
            <HexTile key={tile.id} tile={tile} />
          ))}
          {/* Draw circles for unowned settlement locations*/}
          {vertices.map((vertex) => {
            const tile = tiles.find((t) => t.id === vertex.tileId);
            const { x: centerX, y: centerY } = hexToPixel(
              tile == null
                ? { id: 1, resource: "none", number: 0, q: 0, r: 0, s: 0 }
                : tile
            );
            const { x, y } = pointyHexCorner(
              centerX,
              centerY,
              10,
              vertex.cornerIndex
            );

            return vertex.owner == null ? (
              <circle
                key={vertex.id}
                cx={x}
                cy={y}
                r={0.8}
                stroke="black"
                strokeWidth={0.2}
                fill={vertex.owner ? "blue" : "gray"}
                fillOpacity={0.8}
                onMouseOver={() => setHoveredVertex(vertex)}
                onMouseMove={() => setHoveredVertex(vertex)}
                onMouseOut={() => setHoveredVertex(null)}
                onMouseDown={() => (vertex.owner = "me")}
              />
            ) : (
              <rect
                x={x - 1.5}
                y={y - 1.5}
                width={3}
                height={3}
                fill="orange"
                stroke="orange"
                strokeWidth={0.3}
                pointerEvents="none"
              />
            );
          })}
          {/* Draw circles for unowned road locations*/}
          {edges.map((edge) => {
            const tile = tiles.find((t) => t.id === edge.tileId);
            const { x: centerX, y: centerY } = hexToPixel(
              tile == null
                ? { id: 1, resource: "none", number: 0, q: 0, r: 0, s: 0 }
                : tile
            );
            const { x, y } = pointyHexEdge(
              centerX,
              centerY,
              10,
              edge.edgeIndex
            );

            return edge.owner == null ? (
              <circle
                key={edge.id}
                cx={x}
                cy={y}
                r={0.8}
                stroke="black"
                strokeWidth={0.2}
                fill={edge.owner ? "blue" : "white"}
                fillOpacity={0.8}
                onMouseOver={() => setHoveredEdge(edge)}
                onMouseMove={() => setHoveredEdge(edge)}
                onMouseOut={() => setHoveredEdge(null)}
                onMouseDown={() => (edge.owner = "me")}
              />
            ) : (
              <rect
                x={x - 1}
                y={y - 2.5}
                width={2}
                height={5}
                fill="orange"
                stroke="orange"
                strokeWidth={0.3}
                pointerEvents="none"
                transform={`rotate(${(edge.edgeIndex - 1) * 60} ${x} ${y})`}
              />
            );
          })}
          <EdgeHoverHighlight hoveredEdge={hoveredEdge} tiles={tiles} />
          <VertexHoverHighlight hoveredVertex={hoveredVertex} tiles={tiles} />
        </Layout>
      </HexGrid>
    </div>
  );
}

export default Board;
