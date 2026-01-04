import type { PlayerId } from "./Player";

export interface Road {
    edgeId: number;
    owner: PlayerId;
}