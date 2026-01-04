import type { GameState } from "../models/GameState";
import type { PlayerId } from "../models/Player";

export function buildSettlement(state: GameState, edgeId: number) {
    const player = state.players.find((p) => p.id === state.currentPlayer);
    player?.settlements.push(edgeId);
}

function canBuildSettlement(state: GameState, edgeId: number): boolean {
    return true;
}