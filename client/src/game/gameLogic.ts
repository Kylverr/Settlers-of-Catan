import type { GameState } from "../models/GameState";
import type { PlayerId } from "../models/Player";

export function buildSettlement(state: GameState, vertexId: number) {
    const player = state.players.find((p) => p.id === state.currentPlayer);
    state.settlements.push({
        vertexId,
        owner: state.currentPlayer,
        isCity: false
    });
}

function canBuildSettlement(state: GameState, vertexId: number): boolean {
    const player = state.players.find((p) => p.id === state.currentPlayer);
    if (!player) return false;

    // Check if vertex is already occupied
    const existingSettlement = state.settlements.find(s => s.vertexId === vertexId);
    if (existingSettlement) return false;

    // TODO: Check if there is a settlement or city adjacent to this vertex
    return true;
}