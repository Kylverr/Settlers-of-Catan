import type { Edge } from "./Edge";
import type { Player, PlayerId } from "./Player";
import type { Tile } from "./Tile";
import type { Vertex } from "./Vertex";

export interface GameState {
    tiles: Tile[],
    vertices: Vertex[],
    edges: Edge[],
    players: Player[],
    currentPlayer: PlayerId,
    currentRoll: number,
    robberTileId: number
}