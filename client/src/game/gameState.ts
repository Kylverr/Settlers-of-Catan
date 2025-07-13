import type { GameState } from "../models/GameState";
import { initializeEdges, initializeTiles, initializeVertices } from "./initializeBoard";

export function initializeGameState(): GameState {
    const tiles = initializeTiles();
    const vertices = initializeVertices(tiles);
    const edges = initializeEdges(tiles);
    return {
        tiles,
        vertices,
        edges,
        players: [
            { id: "p1", name: "player1", resources: {
                none: 0,
                wood: 0,
                wheat: 0,
                ore: 0,
                brick: 0,
                sheep: 0
            }, settlements: [], roads: [], cities: []},{ id: "p2", name: "player2", resources: {
                none: 0,
                wood: 0,
                wheat: 0,
                ore: 0,
                brick: 0,
                sheep: 0
            }, settlements: [], roads: [], cities: []}

        ],
        currentPlayer: "p1",
        currentRoll: 0,
        robberTileId: tiles.find((t) => t.resource === "none")?.id ?? 0
    }
}