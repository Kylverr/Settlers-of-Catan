import type { GameState } from "../models/GameState";

export function initializeGameState(): GameState {
    return {
        phase: "SETUP_1",
        settlements: [],
        roads: [],
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
        robberTileId: 0
    }
}