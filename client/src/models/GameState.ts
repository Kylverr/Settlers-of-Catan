import type { Player, PlayerId } from "./Player";
import type { Settlement } from "./Settlement";
import type { Road } from "./Road";

type Phase = 
    | "SETUP_1" 
    | "SETUP_2" 
    | "MAIN_GAME";

export type Action =
  | { type: "PLACE_SETTLEMENT"; vertexId: string }
  | { type: "PLACE_ROAD"; edgeId: string }
  | { type: "END_TURN" };

export interface GameState {
    phase: Phase;
    settlements: Settlement[];
    roads: Road[];
    players: Player[],
    currentPlayer: PlayerId,
    currentRoll: number,
    robberTileId: number
}