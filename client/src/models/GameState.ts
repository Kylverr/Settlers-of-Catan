import type { Player } from "./Player";
import type { Settlement } from "./Settlement";
import type { Road } from "./Road";

type Phase = 
    | "SETUP_1" 
    | "SETUP_2" 
    | "MAIN_GAME";

export type Action =
  | { type: "PLACE_SETTLEMENT"; playerId: string; vertexId: string }
  | { type: "PLACE_ROAD"; playerId: string; edgeId: string }
  | { type: "END_TURN"; playerId: string };

export interface GameState {
    phase: Phase;
    settlements: Settlement[];
    roads: Road[];
    players: Player[],
    currentPlayerIndex: number,
    currentRoll: number,
    robberTileId: number

    pendingPlacement?: "SETTLEMENT" | "ROAD";
}