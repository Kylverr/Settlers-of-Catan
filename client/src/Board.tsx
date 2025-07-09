import HexTile from "./HexTile";
import { HexGrid, Layout } from "react-hexgrid";
import { initializeTiles, initializeVertices } from "./initializeBoard";
import { useState } from "react";
import type { Tile } from "./models/Tile";
import type { Vertex } from "./models/Vertex";
import type { Edge } from "./models/Edge";

function Board() {
  // Initialize board once
  const [tiles, setTiles] = useState<Tile[]>(() => initializeTiles());

  // Initialize vertex and edge positions
  const [vertices, setVertices] = useState<Vertex[]>(() =>
    initializeVertices()
  );
  const [edges, setEdges] = useState<Edge[]>();

  return (
    <div>
      <HexGrid width={1200} height={800} viewBox="-50 -50 100 100">
        {/* Grid with manually inserted hexagons */}
        <Layout
          size={{ x: 10, y: 10 }}
          flat={false}
          spacing={1.1}
          origin={{ x: 0, y: 0 }}
        >
          {tiles.map((tile) => (
            <HexTile key={tile.id} tile={tile} />
          ))}
        </Layout>
        <svg>
          {vertices.map((vertex) => (
            <circle cx="100" cy="100" r="50" stroke="black" fill="red" />
          ))}
        </svg>
      </HexGrid>
    </div>
  );
}

export default Board;
