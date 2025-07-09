import { Hexagon, Text } from "react-hexgrid";
import type { Tile } from "./models/Tile";
import "./HexTile.css";

interface HexTileProps {
  tile: Tile;
}

function HexTile({ tile }: HexTileProps) {
  return (
    <Hexagon
      q={tile.q}
      r={tile.r}
      s={tile.s}
      className={"tile" + tile.resource}
    >
      <Text className="tiletext">{tile.number}</Text>
    </Hexagon>
  );
}

export default HexTile;
