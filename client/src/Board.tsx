import HexTile from "./HexTile";
import { HexGrid, Layout } from "react-hexgrid";
import { initializeBoard } from "./initializeBoard";

function Board() {
  const tiles = initializeBoard();

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
      </HexGrid>
    </div>
  );
}

export default Board;
