import type { Player, PlayerId } from "./Player";
import type { Settlement } from "./Settlement";
import type { Road } from "./Road";

export interface GameState {
    settlements: Settlement[];
    roads: Road[];
    players: Player[],
    currentPlayer: PlayerId,
    currentRoll: number,
    robberTileId: number
}