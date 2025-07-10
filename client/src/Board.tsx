import HexTile from "./HexTile";
import { HexGrid, Layout } from "react-hexgrid";
import { initializeTiles, initializeVertices } from "./initializeBoard";
import { useState } from "react";
import type { Tile } from "./models/Tile";
import type { Vertex } from "./models/Vertex";
import type { Edge } from "./models/Edge";

function hexToPixel(tile: Tile) {
  let x = Math.sqrt(3) * tile.q + (Math.sqrt(3) / 2) * tile.r;
  let y = (3 / 2) * tile.r;
  x = x * 10;
  y = y * 10;
  return { x, y };
}

function pointyHexCorner(x: number, y: number, size: number, i: number) {
  const angles = [-30, 30, 90, 150, 210, 270];
  const angleRad = (Math.PI / 180) * angles[i];
  x = x + size * Math.cos(angleRad);
  y = y + size * Math.sin(angleRad);
  return { x, y };
}

function Board() {
  // Initialize board once
  const [tiles, setTiles] = useState<Tile[]>(() => initializeTiles());

  // Initialize vertex and edge positions
  const [vertices, setVertices] = useState<Vertex[]>(() =>
    initializeVertices(tiles)
  );
  const [edges, setEdges] = useState<Edge[]>();

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
          {tiles.map((tile) => (
            <HexTile key={tile.id} tile={tile} />
          ))}
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

            return (
              <circle
                key={vertex.id}
                cx={x}
                cy={y}
                r={0.8}
                stroke="black"
                strokeWidth={0.2}
                fill={vertex.owner ? "blue" : "gray"}
                fillOpacity={0.8}
              />
            );
          })}
        </Layout>
      </HexGrid>
    </div>
  );
}

export default Board;
